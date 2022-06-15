<?php

namespace App\Imports;

use App\Models\FinancialAccount;
use App\Models\Invoice;
use App\Models\Supplier;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\OnEachRow;
use Maatwebsite\Excel\Row;

class InvoicesImport implements OnEachRow
{
    public function onRow(Row $row)
    {
        if($row->getIndex() == 1){
            return ;
        }
        $row = $row->toArray();
        $supplier = Supplier::firstOrCreate(['name' => $row[1]]);
        $financialAccount = FinancialAccount::firstOrCreate(['number' => $row[20]]);


        $invoice = new Invoice();
        $invoice->number = $row[0];
        $invoice->currency = $row[8];
        $invoice->date = Carbon::createFromFormat('d/m/Y', $row[3]);
        $invoice->amount = $row[9];
        $invoice->supplier()->associate($supplier);
        $invoice->financialAccount()->associate($financialAccount);
        $invoice->save();
    }
}
