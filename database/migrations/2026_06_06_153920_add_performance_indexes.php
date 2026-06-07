<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->index(['status', 'created_by']);
            $table->index(['category_id', 'status']);
            $table->index(['department_id', 'status']);
        });

        Schema::table('vendors', function (Blueprint $table) {
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropIndex(['status', 'created_by']);
            $table->dropIndex(['category_id', 'status']);
            $table->dropIndex(['department_id', 'status']);
        });

        Schema::table('vendors', function (Blueprint $table) {
            $table->dropIndex(['status']);
        });
    }
};