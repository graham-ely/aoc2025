// 2:50:49 from start of 13
import * as fs from 'fs';
import { memoize } from 'micro-memoize';

//const data_path: string = "13_data_test.txt";
const data_path: string   = "13_data.txt";
const data: string = fs.readFileSync(data_path, 'utf-8');
const data_arr: string[] = data.split(/\r?\n/);
const data_arr_nb: string[] = []; // no blanks

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
            //sum++;
        } else {
            arr[row + 1] = arr[row + 1].substring(0, col) + '|' + arr[row + 1].substring(col + 1);
        }
    }

    return false;
}

// chop non-caret lines
for(let i = 0; i < data_arr.length; i++) {
    if( i == 0 ) {
        data_arr_nb.push(data_arr[i]);
    } else if(data_arr[i].indexOf('^') != -1) {
        data_arr_nb.push(data_arr[i]);
    }
}

var values_array: number[][] = [];

for(let i = 0; i < data_arr_nb.length; i++) { // don't process final row
    var row_to_populate: number[] = [];
    for(let j = 0; j < data_arr_nb[0].length; j++){
        row_to_populate.push(0);
    }
    values_array.push(row_to_populate);
}


for(let i = 0; i < data_arr_nb.length; i++) { // don't process final row
    for(let j = 0; j < data_arr_nb[0].length; j++){
        if(data_arr_nb[i][j] == '|' || i == 0){
            process_point_value(i, j);
        }
    }
}

function process_point_value(row: number, col: number) {
    var point_value: number = 0;
    if(row == 0){
        if(data_arr_nb[row][col] == 'S') {
            point_value = 1;
        }
    } else {
        // check if left caret -> check above left
        if(data_arr_nb[row][col - 1] == '^') {
            point_value += values_array[row - 1][col - 1];
        }
        // check above
        if(values_array[row - 1][col] >= 0) {
            point_value += values_array[row - 1][col];
        }
        // check if right caret -> check above right
        if(data_arr_nb[row][col + 1] == '^') {
            point_value += values_array[row - 1][col + 1];
        }
    }

    values_array[row][col] = point_value;
}

for(var i = 0; i < values_array[0].length; i++) {
    sum += values_array[values_array.length - 1][i];
}

//console.log(data_arr);
//console.log(data_arr_nb);
console.log(sum);

/*
for(var row of data_arr_nb) {
    console.log(row);
}

for(var row2 of values_array) {
    console.log(row2);
}
    */

// 3046 too low
// 11789740 too low
// 145375123 too low