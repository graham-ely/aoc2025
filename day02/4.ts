// 47:36 from start of 3
import * as fs from 'fs';

//const data_path: string = "3_data_test.txt";
const data_path: string   = "3_data.txt";
const data: string = fs.readFileSync(data_path, 'utf-8');
const data_arr: string[] = data.split(',');

var invalid_sum: number = 0;
var invalid_ids: string[] = [];

for(const instr of data_arr){
    const first_id = parseInt(instr.substring(0, instr.indexOf('-')));
    const second_id = parseInt(instr.substring(instr.indexOf('-') + 1));

    for( let i = first_id; i <= second_id; i++ ) {
        var curr_id: string = i.toString();
        var curr_id_len: number = curr_id.length;
        var is_repeating: boolean = true;

        //only has to run up to half
        for(let j = 0; j < (curr_id_len / 2) + 1; j++) {
            // took 10+ minutes to catch the single-digit case, very unfortunate
            if(curr_id_len % j == 0 && curr_id_len > 1) {
                var p1 = curr_id.substring(0, j);
                var p2 = curr_id.substring(j, 2 * j);
                var p_i = 2 * j;

                while(is_repeating && p_i <= curr_id_len) {
                    //console.log("curr_id", curr_id, "p1:", p1, "p2:", p2)
                    if(p1 != p2) {
                        is_repeating = false;
                    } else {
                        p1 = p2;
                        p2 = curr_id.substring(p_i, p_i + j);
                        p_i = p_i + j;
                    }
                }

                if(is_repeating) {
                    if(!invalid_ids.includes(curr_id)) {
                        invalid_sum += i;
                        invalid_ids.push(curr_id);
                    }
                }

                is_repeating = true;
            }
        }
    }
}

console.log(data_arr);
console.log(invalid_ids);
console.log(invalid_sum);