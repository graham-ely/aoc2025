// 26:20 from start of 7

import * as fs from 'fs';

//const data_path: string = "7_data_test.txt";
const data_path: string   = "7_data.txt";
const data: string = fs.readFileSync(data_path, 'utf-8');
var data_arr: string[] = data.split(/\r?\n/);

var sum_avail_rolls: number = 0;
var ids: string[] = [];
var new_roll_map: string[] = [];
var prev_sum_ar: number = -1;

while(sum_avail_rolls != prev_sum_ar){
    prev_sum_ar = sum_avail_rolls;

    for(let i = 0; i < data_arr[0].length; i++) {
        var new_map_line: string = "";

        for(let j = 0; j < data_arr.length; j++ ) {
            var current_item: string = data_arr[i][j];

            if(current_item == '@') {
                const too_many_adj: boolean = check_adj_rolls(i, j, data_arr);

                if(!too_many_adj) {
                    new_map_line += "x";
                    sum_avail_rolls++;
                } else {
                    new_map_line += "@";
                }
            } else {
                new_map_line += ".";
            }
        }

        new_roll_map.push(new_map_line);
    }

    data_arr = new_roll_map;
    new_roll_map = [];
}


function check_adj_rolls(x:number, y:number, arr: string[]) {
    var sum_adj_rolls: number = 0;

    for(let i = -1; i < 2; i++) {
        for(let j = -1; j < 2; j++) {
            if(i == 0 && j == 0) {

            } else {
                var x_pos = x + i;
                var y_pos = y + j;
                // in bounds check
                if(x_pos >= 0 && y_pos >= 0 && x_pos <= arr[0].length - 1 && y_pos <= arr.length - 1) {
                    if(arr[x_pos][y_pos] == '@') {
                        sum_adj_rolls++;
                    }
                }
            }
        }
    }

    if(sum_adj_rolls < 4){
        ids.push("x: " + x + "y: " + y);
        return false;
    } else {
        return true;
    }

}
console.log(data_arr);
console.log(ids);
console.log(sum_avail_rolls);
console.log(new_roll_map)