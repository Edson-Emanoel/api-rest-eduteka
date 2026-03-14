<?php

namespace App\Http\Controllers;

use App\Models\Bill;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBillRequest;
use App\Http\Requests\UpdateBillRequest;

class BillController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $currentPage = $request->get('current_page') ?? 1;
        $regsPerPage = 3;

        $skip = ($currentPage - 1) * $regsPerPage;

        $bills = Bill::skip($skip)->take($regsPerPage)->orderByDesc('id')->get();;

        return response()->json($bills->toResourceCollection(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBillRequest $request)
    {
        $data = $request->validated();

        try {
            $bill = new Bill();
            $bill->fill($data);
            $bill->save();

            return response()->json($bill, 201);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Falha ao cadastrar o conta!'
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $bill = Bill::findOrFail($id);
            return response()->json($bill, 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Falha ao buscar a conta!'
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBillRequest $request, string $id)
    {
        $data = $request->validated();

        try {
            $bill = Bill::findOrFail($id);
            $bill->update($data);

            return response()->json($bill, 201);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Falha ao alterar a conta!'
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $removed = Bill::destroy($id);
            if(!$removed){
                throw new Exception();
            }

            return response()->json($removed, 204);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Falha ao apagar a conta!'
            ], 400);
        }
    }
}
