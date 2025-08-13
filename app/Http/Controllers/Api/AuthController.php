<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\MassAssignmentException;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    public function register(Request $request){
        $response = ["success" => false];

        $validator = Validator::make($request->only(['name', 'email', 'password']), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'max:255'],     
        ]);
        
        if($validator->fails()){
            $response["errors"] = $validator->errors();
            return response()->json($response, 200);
        }
        
        $input = $request->only(['name', 'email', 'password']);
        $user = User::create($input);

        $user->assignRole('client');

        $response["success"] = true;
        // $response["token"] = $user->createToken('Tokenizer')->plainTextToken;

        return response()->json($response, 200);
    }


    public function login(Request $request){
        $response = ["success" => false];

        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',     
        ]);
        
        if($validator->fails()){
            $response["errors"] = $validator->errors();
            return response()->json($response, 200);
        }

        if(auth()->attempt(['email' => $request->email, 'password' => $request->password])){
            $user = auth()->user();
            $user->hasRole('client');

            $response["token"] = $user->createToken('Tokenizer')->plainTextToken;
            $response["user"] = $user;
            $response["success"] = true;
            $response["message"] = "Sesión iniciada";
        }
        return response()->json($response, 200);
    }

    public function logout(Request $request){
        $response = ["success" => false];
        auth()->user()->tokens()->delete();
        $response = ["success" => true,
                    "message" => "Sesión cerrada"];
        return response()->json($response, 200);
    }
}
