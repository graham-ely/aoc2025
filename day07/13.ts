// 19:34 from start of 13
import * as fs from 'fs';

//const data_path: string = "13_data_test.txt";
const data_path: string   = "13_data.txt";
const data: string = fs.readFileSync(data_path, 'utf-8');
const data_arr: string[] = data.split(/\r?\n/);

var sum: number = 0;

for(let i = 0; i < data_arr.length - 1; i++) { // don't process final row
    for(let j = 0; j < data_arr[0].length; j++){
        process_tachyon_coord(i, j, data_arr);
    }
}

function process_tachyon_coord(row: number, col: number, arr: string[]) {
    if(arr[row][col] == 'S'){
        arr[row + 1] = arr[row + 1].substring(0, col) + '|' + arr[row + 1].substring(col + 1);
    } else if(arr[row][col] == '|'){
        if(arr[row + 1][col] == '^'){
            arr[row + 1] = arr[row + 1].substring(0, col - 1) + '|^|' + arr[row + 1].substring(col + 2);
            sum++;
        } else {
            arr[row + 1] = arr[row + 1].substring(0, col) + '|' + arr[row + 1].substring(col + 1);
        }
    }

    return false;
}

console.log(data_arr);
console.log(sum);

for(var row of data_arr) {
    console.log(row);
}