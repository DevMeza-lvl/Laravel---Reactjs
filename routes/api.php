<?php

use Illuminate\Http\Request;
use illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\FrontController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Admin\UserController;
use App\Http\Controllers\Api\Admin\CategoriaController;
use App\Http\Controllers\Api\Admin\EmpresaController;
use App\Http\Controllers\Api\Client\EmpresaController as EmpresaClientController;

Route::prefix('v1')->group(function () {

    //Publico
    Route::get('/public/empresas/{quantity}', [FrontController::class, 'empresas']);
    // Route::get('/public/{slug}', [FrontController::class, 'categoria']);

    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);

    //Private
    Route::group(['middleware' => 'auth:sanctum'], function () {

        //auth
        Route::post('/auth/logout', [AuthController::class, 'logout']);

        //cliente
        Route::apiResource('/client/empresa', EmpresaClientController::class);

        //admin
        Route::apiResource('/admin/user', UserController::class);
        Route::apiResource('/admin/categoria', CategoriaController::class);
        Route::apiResource('/admin/empresa', EmpresaController::class);

    });

});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});