//  from start of 5
import * as fs from 'fs';

const data_path: string = "5_data_test.txt";
//const data_path: string   = "5_data.txt";
const data: string = fs.readFileSync(data_path, 'utf-8');
const data_arr: string[] = data.split(/\r?\n/);

var sum: number = 0;
var ids: string[] = [];

for(const instr of data_arr){
}

console.log(data_arr);
console.log(ids);
console.log(sum);