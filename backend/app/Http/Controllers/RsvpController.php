<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Response;

class RsvpController extends Controller
{
    public function store(Event $event) {    
        if ($event->rsvps->count() >= $event->rsvp_limit) {
            return response()->json(false, Response::HTTP_BAD_REQUEST);
        }
    
        $event->rsvps()->create(['user_id' => auth()->id()]);
    
        return response()->json(true, Response::HTTP_CREATED);
    }
    
}
