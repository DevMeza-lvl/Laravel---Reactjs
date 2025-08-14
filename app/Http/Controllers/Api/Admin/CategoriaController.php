<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Categoria;
use Illuminate\Support\Str;

class CategoriaController extends Controller
{
    public function index(){
        $data = Categoria::orderBy("orden")->select('id', 'nombre', 'orden')->get();
        return response()->json($data, 200);
    }

    public function store(Request $request){
        $data = new Categoria();
        $data->fill($request->all());
        if ($request->urlfoto) {
            $folderPath = public_path('img/categorias/');
            $image_parts = explode(";base64,", $request->urlfoto);
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);
            $fileName = uniqid() . '.' . $image_type;
            $file = $folderPath . Str::slug($data->nombre) . $fileName . '.' . $image_type;
            file_put_contents($file, $image_base64);
            $data->urlfoto = Str::slug($data->nombre) . $fileName . '.' . $image_type;
        }
        $data->slug = Str::slug($data->nombre);
        $data->save();
        return response()->json($data, 200);
    }

    public function show($id){
        $data = Categoria::find($id);
        return response()->json($data, 200);
    }

    public function update(Request $request, $id){
        $data = Categoria::find($id);
        $data->fill($request->all());
        if ($request->urlfoto) {
            $folderPath = public_path('img/categorias/');
            $image_parts = explode(";base64,", $request->urlfoto);
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);
            $fileName = uniqid() . '.' . $image_type;
            $file = $folderPath . Str::slug($data->nombre) . $fileName . '.' . $image_type;
            file_put_contents($file, $image_base64);
            $data->urlfoto = Str::slug($data->nombre) . $fileName . '.' . $image_type;
        }
        $data->slug = Str::slug($data->nombre);
        $data->save();
        return response()->json($data, 200);
    }

    public function destroy($id){
        $data = Categoria::find($id)->delete();
        return response()->json("Eliminado", 200);
    }
}
