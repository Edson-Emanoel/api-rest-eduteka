<?php

namespace App\Http\Controllers;

use App\Models\Customer;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customers = Customer::all();

        return response()->json($customers, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCustomerRequest $request)
    {
        $data = $request->validated();

        try {
            $customer = new Customer();
            // dd($data);
            $customer->fill($data);
            $customer->save();

            return response()->json($customer, 201);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Falha ao buscar clientes!'
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $customer = Customer::findOrFail($id);
            return response()->json($customer, 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Falha ao buscar cliente!'
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomerRequest $request, string $id)
    {
        $data = $request->validated();

        try {
            $customer = Customer::findOrFail($id);
            $customer->update($data);

            return response()->json($customer, 201);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Falha ao alterar clientes!'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $removed = Customer::destroy($id);
            if(!$removed){
                throw new Exception();
            }

            return response()->json($removed, 204);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Falha ao deletar cliente!'
            ], 400);
        }
    }
}
