<?php

namespace App\Http\Controllers;

use App\Http\Resources\DepartmentResource;
use App\Http\Resources\PaginatedResource;
use App\Http\Resources\ProductListResource;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Department;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    private function productWithRelations()
    {
        return Product::query()
            ->forWebsite()
            ->with(['category', 'department', 'user', 'media']);
    }

    public function home(Request $request)
    {
        $keyword = $request->query('keyword');

        $products = $this->productWithRelations()
            ->searchKeyword($keyword)
            ->paginate(12);

        return Inertia::render('Home', [
            'products' => ProductListResource::collection($products),
        ]);
    }

    public function shop(Request $request)
    {
        $query = $this->productWithRelations();

        if ($request->filled('category')) {
            $query->where('category_id', $request->category);
        }

        if ($request->filled('price_min')) {
            $query->where('price', '>=', $request->price_min);
        }

        if ($request->filled('price_max')) {
            $query->where('price', '<=', $request->price_max);
        }

        if ($request->sort === 'price_asc') {
            $query->orderBy('price');
        } elseif ($request->sort === 'price_desc') {
            $query->orderByDesc('price');
        } elseif ($request->sort === 'latest') {
            $query->latest('products.created_at');
        }

        $products = $query
            ->searchKeyword($request->query('keyword'))
            ->paginate(12)
            ->withQueryString();

        $categories = Category::select('id', 'name')
            ->withCount('products')
            ->has('products')
            ->get();

        return Inertia::render('Product/Shop', [
            'products' => PaginatedResource::format($products, ProductListResource::class),
            'filters' => [
                'categories' => $categories,
            ],
        ]);
    }

    public function show(Product $product)
    {
        $product->load(['category', 'department', 'user', 'media', 
                        'variationTypes.options.media']);

        $relatedProducts = $this->productWithRelations()
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->take(8)
            ->get();

        return Inertia::render('Product/Show', [
            'product'          => new ProductResource($product),
            'relatedProducts'  => ProductListResource::collection($relatedProducts),
            'variationOptions' => request('options', []),
        ]);
    }

    public function byDepartment(Request $request, Department $department)
    {
        abort_unless($department->active, 404);

        $products = $this->productWithRelations()
            ->where('department_id', $department->id)
            ->searchKeyword($request->query('keyword'))
            ->paginate();

        return Inertia::render('Department/Index', [
            'department' => new DepartmentResource($department),
            'products'   => PaginatedResource::format($products, ProductListResource::class),
        ]);
    }
}