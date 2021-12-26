<?php

use App\Http\Controllers\AvatarController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TokenController;
use App\Http\Controllers\AuthController;
use App\Http\Resources\UserResource;
use App\Models\User;

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
Route::middleware(['auth:sanctum'])
->group(function () {

  Route::prefix('users')
  ->group(function () {

    Route::prefix('auth')
    ->group(function () {
      Route::get('/', AuthController::class);
      Route::post('/avatar', [AvatarController::class, 'store']);
    });
  });
});

/* Admin Routes */
Route::middleware(['auth:sanctum', 'admin'])
->group(function () {

  Route::prefix('users')
  ->group(function () {
    Route::get('/', function () {
      return UserResource::collection(User::paginate(5));
    });
  });
});
