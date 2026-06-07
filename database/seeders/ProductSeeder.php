<?php

namespace Database\Seeders;

use App\Enum\ProductStatusEnum;
use App\Models\Category;
use App\Models\Department;
use App\Models\Product;
use App\Models\User;
use App\Models\Vendor;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // Get approved vendor user
        $vendor = Vendor::where('status', 'approved')->first();

        if (!$vendor) {
            $this->command->error('No approved vendor found. Run UserSeeder first.');
            return;
        }

        $vendorUser = User::find($vendor->user_id);

        // Get categories and departments
        $categories  = Category::all();
        $departments = Department::all();

        if ($categories->isEmpty() || $departments->isEmpty()) {
            $this->command->error('No categories or departments found. Run CategorySeeder and DepartmentSeeder first.');
            return;
        }

        // Fetch products from DummyJSON by category for better coverage
        $this->command->info('Fetching products from DummyJSON...');

        $dummyCategories = [
            'smartphones',
            'laptops',
            'tablets',
            'mobile-accessories',
            'mens-shirts',
            'mens-shoes',
            'mens-watches',
            'womens-dresses',
            'womens-shoes',
            'womens-watches',
            'womens-bags',
            'womens-jewellery',
            'sunglasses',
            'tops',
            'furniture',
            'home-decoration',
            'lighting',
            'kitchen-accessories',
            'skincare',
            'fragrances',
            'motorcycle',
            'vehicle',
            'groceries',
            'sports-accessories',
        ];

        $dummyProducts = [];

        foreach ($dummyCategories as $cat) {
            $response = Http::withoutVerifying()
                ->get("https://dummyjson.com/products/category/{$cat}?limit=50");

            if ($response->ok()) {
                $products = $response->json('products') ?? [];
                $dummyProducts = array_merge($dummyProducts, $products);
                $this->command->info("  Fetched " . count($products) . " products from [{$cat}]");
            } else {
                $this->command->warn("  Failed to fetch [{$cat}]");
            }
        }

        $this->command->info('Inserting ' . count($dummyProducts) . ' products...');

        // Map DummyJSON category slugs to your DB category names
        $categoryMap = [
            'smartphones'         => "Smartphones",
            'laptops'             => "Laptops",
            'tablets'             => "Tablets",
            'mobile-accessories'  => "Mobile Accessories",
            'mens-shirts'         => "Men's Shirts",
            'mens-shoes'          => "Men's Shoes",
            'mens-watches'        => "Men's Watches",
            'womens-dresses'      => "Women's Dresses",
            'womens-shoes'        => "Women's Shoes",
            'womens-watches'      => "Women's Watches",
            'womens-bags'         => "Women's Bags",
            'womens-jewellery'    => "Women's Jewellery",
            'sunglasses'          => "Sunglasses",
            'tops'                => "Tops",
            'furniture'           => "Furniture",
            'home-decoration'     => "Home Decoration",
            'lighting'            => "Lighting",
            'kitchen-accessories' => "Kitchen",
            'skincare'            => "Skincare",
            'fragrances'          => "Fragrances",
            'motorcycle'          => "Motorcycle",
            'vehicle'             => "Car Accessories",
            'groceries'           => "Food",
            'sports-accessories'  => "Food",
        ];

        foreach ($dummyProducts as $item) {
            $categoryName = $categoryMap[$item['category']] ?? null;
            $category = $categoryName
                ? Category::where('name', $categoryName)->first()
                : $categories->random();

            $department = $category
                ? Department::find($category->department_id)
                : $departments->random();

            $product = Product::create([
                'title'         => $item['title'],
                'slug'          => Str::slug($item['title']) . '-' . Str::random(5),
                'description'   => $item['description'],
                'price'         => $item['price'],
                'quantity'      => $item['stock'] ?? rand(10, 100),
                'status'        => ProductStatusEnum::Published->value,
                'department_id' => $department->id,
                'category_id'   => $category->id,
                'created_by'    => $vendorUser->id,
                'updated_by'    => $vendorUser->id,
            ]);

            // Attach thumbnail image via Spatie Media Library
            $images = $item['images'] ?? [];
            $imageUrl = !empty($images) ? $images[0] : ($item['thumbnail'] ?? null);

            // Clean up DummyJSON's messy image URLs (they sometimes wrap URLs in brackets)
            if ($imageUrl) {
                $imageUrl = trim($imageUrl, '[]"\'');
            }

            if ($imageUrl && filter_var($imageUrl, FILTER_VALIDATE_URL)) {
                try {
                    $product->addMediaFromUrl($imageUrl)
                        ->toMediaCollection('images');
                } catch (\Exception $e) {
                    $this->command->warn("Could not attach image for: {$item['title']}");
                }
            }
        }

        $this->command->info('Done! ' . count($dummyProducts) . ' products seeded with images.');
    }
}
