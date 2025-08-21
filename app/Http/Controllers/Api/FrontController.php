<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Empresa;

class FrontController extends Controller
{
    public function empresas(Request $request){
        $data = Empresa::orderByDesc('created_at')->take($request->quantity)->get(["id", "nombre", "descripcion"]);
        return response()->json($data, 200);
    }
}