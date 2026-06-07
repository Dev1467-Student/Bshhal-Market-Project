<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        // Department IDs (matching order above):
        // 1 = Electronics
        // 2 = Fashion
        // 3 = Home & Furniture
        // 4 = Health & Beauty
        // 5 = Automotive
        // 6 = Groceries

        $categories = [
            // Electronics
            ['name' => 'Smartphones',       'department_id' => 1, 'parent_id' => null, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Laptops',           'department_id' => 1, 'parent_id' => null, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Tablets',           'department_id' => 1, 'parent_id' => null, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Mobile Accessories','department_id' => 1, 'parent_id' => null, 'active' => true, 'created_at' => now(), 'updated_at' => now()],

            // Fashion
            ['name' => "Men's Shirts",      'department_id' => 2, 'parent_id' => null, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => "Men's Shoes",       'department_id' => 2, 'parent_id' => null, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => "Men's Watches",     'department_id' => 2, 'parent_id' => null, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => "Women's Dresses",   'department_id' => 2, 'parent_id' => null, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => "Women's Shoes",     'department_id' => 2, 'parent_id' => null, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => "Women's Watches",   'department_id' => 2, 'parent_id' => null, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => "Women's Bags",      'department_id' => 2, 'parent_id' => null, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => "Women's Jewellery", 'department_id' => 2, 'parent_id' => null, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Sunglasses',        'department_id' => 2, 'parent_id' => null, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Tops',              'department_id' => 2, 'parent_id' => null, 'active' => true, 'created_at' => now(), 'updated_at' => now()],

            // Home & Furniture
            ['name' => 'Furniture',         'department_id' => 3, 'parent_id' => null, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Home Decoration',   'department_id' => 3, 'parent_id' => null, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Lighting',          'department_id' => 3, 'parent_id' => null, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Kitchen',           'department_id' => 3, 'parent_id' => null, 'active' => true, 'created_at' => now(), 'updated_at' => now()],

            // Health & Beauty
            ['name' => 'Skincare',          'department_id' => 4, 'parent_id' => null, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Fragrances',        'department_id' => 4, 'parent_id' => null, 'active' => true, 'created_at' => now(), 'updated_at' => now()],

            // Automotive
            ['name' => 'Motorcycle',        'department_id' => 5, 'parent_id' => null, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Car Accessories',   'department_id' => 5, 'parent_id' => null, 'active' => true, 'created_at' => now(), 'updated_at' => now()],

            // Groceries
            ['name' => 'Food',              'department_id' => 6, 'parent_id' => null, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Beverages',         'department_id' => 6, 'parent_id' => null, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
        ];

        DB::table('categories')->insert($categories);
    }
}