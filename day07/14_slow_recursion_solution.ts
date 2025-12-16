
// 19:34 from start of 13
import * as fs from 'fs';
import { memoize } from 'micro-memoize';

//const data_path: string = "13_data_test.txt";
const data_path: string   = "13_data.txt";
const data: string = fs.readFileSync(data_path, 'utf-8');
const data_arr: string[] = data.split(/\r?\n/);

var sum: number = 0;
var sum2: number = 0;


const memoized = memoize(process_tachyon_coord, {maxArgs: 2, maxSize: 1000000});

sum = memoized(0, data_arr[0].indexOf('S'));

function process_tachyon_coord(row: number, col: number): number {
    if(row >= data_arr.length - 1){
        sum2++;
        if(sum2 % 10000000 == 0) console.log(sum2);
        return 1;
    } else if(data_arr[row][col] == '^'){
        return process_tachyon_coord(row + 2, col - 1) + process_tachyon_coord(row + 2, col + 1);
    } else {
        return process_tachyon_coord(row + 2, col);
    }

    return 0;
}

console.log(data_arr);
console.log(sum);

for(var row of data_arr) {
    console.log(row);
}

// 3046 too low
// 11789740 too low
// 145375123 too low