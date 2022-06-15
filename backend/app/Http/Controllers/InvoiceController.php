<?php

namespace App\Http\Controllers;

use App\Imports\InvoicesImport;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;

class InvoiceController extends Controller
{

    public function create(Request $request){
        $request->validate([
            'filesheet' => 'required|file|mimes:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,xlsx',
        ]);
        $file = $this->upload($request->file('filesheet'));

        try {

            Excel::import(new InvoicesImport(), $file);
        }catch (\Exception $exception){
            return new Response(['error' => $exception->getMessage()], 500);
        }
        return new Response([], 201);
    }


    private function upload(UploadedFile $file)
    {
        $extension = $file->getClientOriginalExtension();
        $sha1 = sha1($file->getClientOriginalName());
        $date = date('Y-m-d-h-i-s');
        $filename = $date . "_" . $sha1 . "." . $extension;
        Storage::disk('local')->put($filename, $file->getContent());
        return $filename;
    }
}
