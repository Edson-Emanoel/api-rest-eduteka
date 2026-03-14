<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $currentPage = $request->get('current_page') ?? 1;
        $regsPerPage = 3;

        $skip = ($currentPage - 1) * $regsPerPage;

        $products = Product::skip($skip)->take($regsPerPage)->orderByDesc('id')->get();

        return response()->json($products->toResourceCollection(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();

        try {
            $product = new Product();
            $product->fill($data);
            $product->save();

            return response()->json($product, 201);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Falha ao cadastrar o produto',
                'err' => $th
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $product = Product::findOrFail($id);
            return response()->json($product, 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Falha ao buscar o produto',
                'err' => $th
            ], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, string $id)
    {
        $data = $request->validated();

        try {
            $product = Product::findOrFail($id);
            $product->update($data);

            return response()->json($product, 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Falha ao alterar o produto',
                'err' => $th
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $removed = Product::destroy($id);
            if(!$removed){
                throw new Exception();
            }

            return response()->json([
                'message' => 'Produto deletado com sucesso!'
            ], 204);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Falha ao deletar o produto',
                'err' => $th
            ], 400);
        }
    }
}
