// 11:12 from start of 1
import * as fs from 'fs';

const data_path: string = "1_data.txt";
const data: string = fs.readFileSync(data_path, 'utf-8');
const data_arr: string[] = data.split(/\r?\n/);

var sum: number        = 50;
var zero_count: number = 0;

for(const instr of data_arr){
    const dir: string      = instr.charAt(0);
    const distance: number = parseInt(instr.slice(1));

    if( dir == 'R' ) {
        sum += distance;
    } else {
        sum -= distance;
    }

    if( sum % 100 == 0 ){
        zero_count++;
    }
}

console.log(zero_count);