<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Empresa;
use Illuminate\Support\Str;

class EmpresaController extends Controller
{
    public function index(){
        $data = Empresa::whereUserId(auth()->user()->id)->orderBy("orden")->select('id', 'nombre', 'orden')->get();
        return response()->json($data, 200);
    }

    public function store(Request $request){
        $data = new Empresa();
        $data->fill($request->all());
        if ($request->urlfoto) {
            $folderPath = public_path('img/empresa/');
            $image_parts = explode(";base64,", $request->urlfoto);
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);
            $fileName = uniqid() . '.' . $image_type;
            $file = $folderPath . Str::slug($data->nombre) . $fileName . '.' . $image_type;
            file_put_contents($file, $image_base64);
            $data->urlfoto = Str::slug($data->nombre) . $fileName . '.' . $image_type;
        }
        $data->user_id = auth()->user()->id;
        $data->save();
        return response()->json($data, 200);
    }

    public function show($id){
        $data = Empresa::find($id);
        return response()->json($data, 200);
    }

    public function update(Request $request, $id){
        $data = Empresa::find($id);
        $data->nombre = $request->nombre;
        $data->email = $request->email;
        $data->orden = $request->orden;
        $data->descripcion = $request->descripcion;
        $data->telefono = $request->telefono;
        $data->direccion = $request->direccion;
        $data->website = $request->website;
        $data->facebook = $request->facebook;
        $data->youtube = $request->youtube;
        $data->x = $request->x;
        $data->categoria_id = $request->categoria_id;

        if ($request->file) {
            $img = $request->file;
            $folderPath = public_path('img/empresa/');
            $image_parts = explode(";base64,", $img);
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);
            $fileName = uniqid();
            $file = $folderPath . Str::slug($request->nombre) . $fileName . '.' . $image_type;
            file_put_contents($file, $image_base64);
            $data->urlfoto = Str::slug($request->nombre) . $fileName . '.' . $image_type;
        }
        $data->save();
        return response()->json($data, 200);
    }

    public function destroy($id){
        $data = Empresa::find($id)->delete();
        return response()->json("Eliminado", 200);
    }
}
