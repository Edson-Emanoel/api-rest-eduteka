<?php

namespace App\Http\Resources;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class CustomerCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        $totalCustomers = Customer::count();

        return [
            'data' => $this->collection,
            'infos' => [
                'total_customers' => $totalCustomers
            ]
        ];
    }
}
