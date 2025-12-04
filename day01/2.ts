// 39:52 from start of 1
import * as fs from 'fs';

const data_path: string   = "1_data.txt";
//const data_path: string = "2_data_test.txt";
const data: string        = fs.readFileSync(data_path, 'utf-8');
const data_arr: string[]  = data.split(/\r?\n/);

var dial: number       = 50;
var zero_count: number = 0;

for(const instr of data_arr){
    //reset dial
    if(dial > 100 || dial < -100) {
        zero_count++;
    }
    dial = dial % 100;

    console.log("Dial is at:", dial, "ZC is:", zero_count);

    const dir: string      = instr.charAt(0);
    const distance: number = parseInt(instr.slice(1));

    const full_rotations: number = Math.floor(distance / 100);
    const remaining_dist: number = distance % 100;

    zero_count += full_rotations;

    if( dir == 'R' ) {
        if( dial < 0 && dial + remaining_dist > 0 ){
            zero_count++;
        }
        dial += remaining_dist;
    } else {
        if( dial > 0 && dial - remaining_dist < 0 ){
            zero_count++;
        }
        dial -= remaining_dist;
    }

    if( dial % 100 == 0 ){
        zero_count++;
    }

    console.log(dir, distance, dial, full_rotations, zero_count);

}

console.log("zc:", zero_count);