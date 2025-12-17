//  from start of 15
import * as fs from 'fs';

//const data_path: string = "15_data_test.txt";
const data_path: string   = "15_data.txt";
const data: string = fs.readFileSync(data_path, 'utf-8');
const data_arr: string[] = data.split(/\r?\n/);

var sum: number = 0;

for(let i = 0; i < data_arr.length; i++) {
}

function func(a :number, arr :string[]) {
    return false;
}

console.log(data_arr);
console.log(sum);