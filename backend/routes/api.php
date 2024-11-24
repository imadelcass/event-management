<?php

use Illuminate\Support\Facades\Route;


use App\Http\Controllers\EventController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RSVPController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/events', [EventController::class, 'index']);
    Route::post('/events', [EventController::class, 'store'])->middleware('can:manage-events');
    Route::put('/events/{event}', [EventController::class, 'update'])->middleware('can:manage-events');
    Route::delete('/events/{event}', [EventController::class, 'destroy'])->middleware('can:manage-events');
    Route::post('/events/{event}/rsvp', [RSVPController::class, 'store']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

