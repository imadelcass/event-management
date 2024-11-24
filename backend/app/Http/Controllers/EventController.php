<?php

namespace App\Http\Controllers;

use App\Http\Requests\EventRequest;
use App\Http\Resources\EventResource;
use App\Models\Event;
use Illuminate\Http\Response;

class EventController extends Controller
{
    public function index()
    {
        $query = Event::query();

        if (request()->has('filter')) {
            $query->where(function ($query) {
                foreach (request('filter') as $field => $value) {
                    $query->where($field, 'like', "%$value%");
                }
            });
        }

        if (request()->has('sort')) {
            $sortParam = request()->input('sort');
            [$sortColumn, $sortDirection] = explode(',', $sortParam);

            if (! in_array(strtolower($sortDirection), ['asc', 'desc'])) {
                $sortDirection = 'desc'; // Default to 'desc' if invalid
            }
        }

        $query = $query->orderBy($sortColumn, $sortDirection);

        return EventResource::collection($query->paginate());
    }

    public function store(EventRequest $request)
    {
        Event::create($request->validated());

        return response()->json(true, Response::HTTP_CREATED);
    }

    public function update(EventRequest $request, Event $event)
    {
        $event->update($request->validated());

        return response()->json(true, Response::HTTP_OK);
    }

    public function destroy(Event $event)
    {
        $event->delete();

        return response()->json(true, Response::HTTP_OK);
    }
}
