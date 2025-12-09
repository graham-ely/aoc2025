// 17:45 from start of 7
import * as fs from 'fs';

//const data_path: string = "7_data_test.txt";
const data_path: string   = "7_data.txt";
const data: string = fs.readFileSync(data_path, 'utf-8');
const data_arr: string[] = data.split(/\r?\n/);

var sum_avail_rolls: number = 0;
var ids: string[] = [];

//for(const instr of data_arr){
//}
for(let i = 0; i < data_arr[0].length; i++) {
    for(let j = 0; j < data_arr.length; j++ ) {
        if(data_arr[i][j] == '@') {
            sum_avail_rolls += check_adj_rolls(i, j, data_arr);
        }
    }
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
        return 1;
    } else {
        return 0;
    }

}
console.log(data_arr);
console.log(ids);
console.log(sum_avail_rolls);