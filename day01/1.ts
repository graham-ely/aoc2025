import * as fs from 'fs';

const data_path: string = "1_data.txt";
const data: string = fs.readFileSync(data_path, 'utf-8');
const data_arr: string[] = data.split(/\r?\n/);

const hello = "hello";

console.log(hello);
console.log(data);
console.log(data_arr);