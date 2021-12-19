<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TokenController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/* Open Routes */
Route::post('/token', [TokenController::class, '__invoke']);

/* Protected Routes */
Route::prefix('users')
    ->middleware(['auth:sanctum'])
    ->group(function () {
        Route::get('/auth', AuthController::class);
    });