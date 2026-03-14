<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BillController;
use App\Http\Controllers\ProductController;

// Route::get('/users', [UserController::class, 'index']);
// Route::post('/users', [UserController::class, 'store']);
Route::apiResource('/users', UserController::class);

Route::apiResource('/products', ProductController::class);

Route::apiResource('/bills', BillController::class);
