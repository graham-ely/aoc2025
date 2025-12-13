//  from start of 11
import * as fs from 'fs';

//const data_path: string = "11_data_test.txt";
const data_path: string   = "11_data.txt";
const data: string = fs.readFileSync(data_path, 'utf-8');
const data_arr: string[] = data.split(/\r?\n/);

var sum: number = 0;
var log_arr: string[] = [];


//for(const ingredient of ingredients){
//}
//for(let i = 0; i < ingredients.length; i++) {
//}


function func(a :number, arr :string[]) {

    return false;
}

console.log(data_arr);
console.log(log_arr);
console.log(sum);