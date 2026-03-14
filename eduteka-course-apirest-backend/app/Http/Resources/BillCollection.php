<?php

namespace App\Http\Resources;

use App\Models\Bill;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class BillCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        $totalBills = Bill::count();

        return [
            'data' => $this->collection,
            'infos' => [
                'total_bills' => $totalBills,
            ],
        ];
    }
}
