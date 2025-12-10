// 26:20 from start of 7

import * as fs from 'fs';

//const data_path: string = "7_data_test.txt";
const data_path: string   = "7_data.txt";
const data: string = fs.readFileSync(data_path, 'utf-8');
var data_arr: string[] = data.split(/\r?\n/);

var sum_avail_rolls: number = 0;
var prev_sum_ar: number     = -1;

var rolls: string[] = [];
var new_roll_map: string[] = [];

// remove rolls until a pass can't find any rolls to remove
while(sum_avail_rolls != prev_sum_ar){
    prev_sum_ar = sum_avail_rolls;

    for(let i = 0; i < data_arr.length; i++) {
        var new_map_line: string = "";

        for(let j = 0; j < data_arr[0].length; j++ ) {
            var current_item: string = data_arr[i][j];

            if(current_item == '@' && !check_adj_rolls(i, j, data_arr)) {
                new_map_line += "x";
                sum_avail_rolls++;
            } else {
                new_map_line += current_item;
            }
        }

        new_roll_map.push(new_map_line);
    }

    data_arr = new_roll_map;
    new_roll_map = [];
}

// check if too many rolls are adjacent to the current position to remove the roll
function check_adj_rolls(row: number, col: number, arr: string[]): boolean {
    var sum_adj_rolls: number = 0;

    for(let i = -1; i < 2; i++) {
        for(let j = -1; j < 2; j++) {
            if(i == 0 && j == 0) {

            } else {
                var row_pos = row + i;
                var col_pos = col + j;

                // in-bounds check
                if(row_pos >= 0 && col_pos >= 0 && row_pos <= arr.length - 1 && col_pos <= arr[0].length - 1) {
                    if(arr[row_pos][col_pos] == '@') {
                        sum_adj_rolls++;
                    }
                }
            }
        }
    }

    if(sum_adj_rolls < 4){
        rolls.push("row: " + row + "col: " + col);
        return false;
    } else {
        return true;
    }

}
console.log(data_arr);
console.log(rolls);
console.log(sum_avail_rolls);
console.log(new_roll_map)