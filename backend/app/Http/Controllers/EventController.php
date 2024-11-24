<?php

namespace App\Http\Controllers;

use App\Http\Requests\EventRequest;
use App\Models\Event;
use Illuminate\Http\Response;

class EventController extends Controller
{
    public function index() {
        return Event::all();
    }
    
    public function store(EventRequest $request) {
        Event::create($request->validated());

        return response()->json(true, Response::HTTP_CREATED);
    }

    public function update(EventRequest $request, Event $event) {
         $event->update($request->validated());

        return response()->json(true, Response::HTTP_OK);
    }

    public function destroy(Event $event) {
        $event->delete();

        return response()->json(true, Response::HTTP_OK);
    }
    
}
