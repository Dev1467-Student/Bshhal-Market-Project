<?php
use Inertia\Inertia;
use App\Enum\RolesEnum;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\VendorController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

// FALLBACK ROUTE FOR STORAGE FILES - MUST BE FIRST!
Route::get('/storage/{path}', function (string $path) {
    if (!Storage::disk('public')->exists($path)) {
        abort(404);
    }

    $file = Storage::disk('public')->path($path);
    $mimeType = Storage::disk('public')->mimeType($path);

    return response()->file($file, [
        'Content-Type' => $mimeType,
        'Cache-Control' => 'public, max-age=31536000',
    ]);
})->where('path', '.*')->name('storage.file');

/* ------ Guest Routes ---------------- */

Route::get('/', [ProductController::class, 'home'])->name('dashboard');
Route::get('/about', [PublicController::class, 'about'])->name('about');
Route::get('/contact', [PublicController::class, 'contact'])->name('contact');

Route::controller(ProductController::class)
    ->name('product.')
    ->group(function () {

        Route::prefix('product')->group(function () {

            // product detail page
            Route::get('{product:slug}', 'show')->name('show');
        });

        //  product by department
        Route::get('d/{department:slug}', 'byDepartment')->name('byDepartment');
    });

Route::get('/shop', [ProductController::class, 'shop'])->name('shop');

// vendor profile
Route::get('/s/{vendor:store_name}', [VendorController::class, 'profile'])->name('vendor.profile');

// cart routes for guest user ---------------------------------------
Route::prefix('cart')
    ->controller(CartController::class)
    ->name('cart.')
    ->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/add/{product}', 'store')->name('store');
        Route::put('/{product}', 'update')->name('update');
        Route::delete('/{product}', 'destroy')->name('destroy');
    });
/* ----------------------------------------------------------------------- */

Route::post('stripe/webhook', [StripeController::class, 'webhook'])->name('stripe.webhook');

/* ----------- Auth Routes -------------------------------------------------------- */
Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // verified logined user routes --------------------------------------------------

    Route::middleware(['verified'])->group(function () {

        Route::post('cart/checkout', [CartController::class, 'checkout'])->name('cart.checkout');

        // stripe routes
        Route::prefix('stripe')
            ->controller(StripeController::class)
            ->name('stripe.')
            ->group(function () {
                Route::get('success',  'success')->name('success');
                Route::get('failure',  'failure')->name('failure');
                Route::post('connect',  'connect')->name('connect')->middleware(['role:' . RolesEnum::Vendor->value]);
            });

        // become a vendor
        Route::post('become-a-vendor', [VendorController::class, 'store'])->name('vendor.store');
    });

    // -----------------------------------------------------------------------------
});

/* ----------------------------------------- */

require __DIR__ . '/auth.php';

// Testing the success and failure pages of the payment process

// Route::get('/test-success', function() {
//     return Inertia::render('Stripe/Success', [
//         'orders' => []
//     ]);
// });

// Route::get('/test-failure', function() {
//     return Inertia::render('Stripe/Failure', [
//         'orders' => []
//     ]);
// });

// Testing the RestPassword, VerifyEmail and ConfirmPassword pages :

Route::get('/test-reset', function () {
    return Inertia::render('Auth/ResetPassword', [
        'token' => 'test-token',
        'email' => 'test@example.com',
    ]);
});

Route::get('/test-verify', function () {
    return Inertia::render('Auth/VerifyEmail', [
        'status' => null,
    ]);
});

Route::get('/test-confirm', function () {
    return Inertia::render('Auth/ConfirmPassword');
});

// Fallback route to serve storage files if symlink fails (great for deployment)
Route::get('/storage/{path}', function (string $path) {
    if (!Storage::disk('public')->exists($path)) {
        abort(404);
    }

    return response()->file(Storage::disk('public')->path($path));
})->where('path', '.*');

