// 12:25 from start of 3
import * as fs from 'fs';

//const data_path: string = "3_data_test.txt";
const data_path: string   = "3_data.txt";
const data: string = fs.readFileSync(data_path, 'utf-8');
const data_arr: string[] = data.split(',');

var invalid_sum: number = 0;

for(const instr of data_arr){
    const first_id = instr.substring(0, instr.indexOf('-'));
    const second_id = instr.substring(instr.indexOf('-') + 1);

    console.log(instr, first_id, second_id)

    for(let i = parseInt(first_id); i <= parseInt(second_id); i++) {
        var curr_id: string = i.toString();
        if(curr_id.length % 2 == 0) {
            const first_half_id  = curr_id.substring(0, curr_id.length / 2);
            const second_half_id = curr_id.substring(curr_id.length / 2);

            if(first_half_id == second_half_id) {
                invalid_sum += i;
            }

            //console.log(first_half_id, second_half_id);
        }
    }

}

console.log(data_arr);
console.log(invalid_sum);