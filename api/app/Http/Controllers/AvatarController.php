<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
// use App\Http\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AvatarController extends Controller
{
    public function store(Request $request)
    {
        $user = Auth::user();
        try {
            $filePath = Storage::disk('spaces')
            ->put('/avatars/user-'.$user->id, $request->file, 'public');
            $user->avatar = env('DO_SPACES_PUBLIC').$filePath;
            $user->save();
            return new UserResource($user);
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage()], 409);
        }
    }
}
