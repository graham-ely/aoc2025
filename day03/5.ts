// 21:38 from start of 5
import * as fs from 'fs';

//const data_path: string = "5_data_test.txt";
const data_path: string   = "5_data.txt";
const data: string = fs.readFileSync(data_path, 'utf-8');
const data_arr: string[] = data.split(/\r?\n/);

var sum_j: number = 0;
var ids: string[] = [];

for(const bank of data_arr){
    var largest_bank: number = 0;
    for(let i = 9; i >= 0; i--) {
        var first_index = bank.indexOf(i.toString());
        if(first_index >= 0) {
            for(let j = 9; j >= 0; j--) {
                const sub_bank   = bank.substring(first_index + 1);
                var second_index = sub_bank.indexOf(j.toString());

                if(second_index >= 0) {
                    const sub_bank_total = Number(i.toString() + j.toString());

                    if( sub_bank_total > largest_bank ) {
                        largest_bank = sub_bank_total
                    }
                }
            }
        }
    }

    sum_j += largest_bank;

    console.log(largest_bank, sum_j);

}

console.log(data_arr);
console.log(ids);
console.log(sum_j);