// 43:30 from start of 5
import * as fs from 'fs';

//const data_path: string = "5_data_test.txt";
const data_path: string   = "5_data.txt";
const data: string = fs.readFileSync(data_path, 'utf-8');
const data_arr: string[] = data.split(/\r?\n/);

var sum_j: number           = 0;
var max_bank_length: number = 12;

for(const bank of data_arr){
    var current_bank: string = bank;
    var bank_index: number = 0;
    var no_change: boolean = true;


    while(current_bank.length > max_bank_length){
        if(bank_index > current_bank.length) {
            bank_index = 0;
            //whole loop through with no changes, cut off the back of the number
            if(no_change) {
                current_bank = current_bank.substring(0, max_bank_length);
            }

            no_change = true;
        }

        if(current_bank[bank_index] < current_bank[bank_index + 1]){
            current_bank = current_bank.substring(0, bank_index) + current_bank.substring(bank_index + 1);
            // restart string
            bank_index = -1;
            no_change = false;
        }

        bank_index++;
    }

    console.log(bank, current_bank);
    sum_j += Number(current_bank);
}

console.log(data_arr);
console.log(sum_j);