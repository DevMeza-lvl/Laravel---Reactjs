<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Empresa;
use App\Models\Categoria;

class FrontController extends Controller
{
    public function empresas(Request $request){
        $data = Empresa::orderByDesc('created_at')->take($request->quantity)->get();
        return response()->json($data, 200);
    }

    public function search(Request $request){
        $data = Empresa::where('nombre', 'like', '%' . $request->input('text') . '%')->get(["id", "nombre", "descripcion"]);
        return response()->json($data, 200);
    }

    public function categorias(){
        $data = Categoria::get();
        return response()->json($data, 200);
    }

    public function categoria($slug){
        $data = [];
        $categoria = Categoria::whereSlug($slug)->first();
        if(!empty($categoria)) 
            $data = [
                'categoria' => $categoria,
                'empresas' => $categoria->empresas
            ];

        return response()->json($data, 200);
    }
}