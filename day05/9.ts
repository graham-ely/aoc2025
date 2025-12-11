// from start of 9
import * as fs from 'fs';

//const data_path: string = "9_data_test.txt";
const data_path: string   = "9_data.txt";
const data: string = fs.readFileSync(data_path, 'utf-8');
const data_arr: string[] = data.split(/\r?\n/);

var sum: number = 0;
var log_arr: string[] = [];

//for(const instr of data_arr){
//}
for(let i = 0; i < data_arr[0].length; i++) {
}


function func(x:number, y:number, arr: string[]) {
    return 0;
}

console.log(data_arr);
console.log(log_arr);
console.log(sum);