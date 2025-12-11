// 9:05 from start of 9
import * as fs from 'fs';

//const data_path: string = "9_data_test.txt";
const data_path: string   = "9_data.txt";
const data: string = fs.readFileSync(data_path, 'utf-8');
const data_arr: string[] = data.split(/\r?\n/);

var sum: number = 0;
var log_arr: string[] = [];

var split_index = data_arr.indexOf("");

var fresh_ranges: string[] = data_arr.slice(0, split_index);
var ingredients: string[] = data_arr.slice(split_index + 1);

for(const ingredient of ingredients){
    if(is_ingredient_fresh(Number(ingredient), fresh_ranges)) {
        sum++;
    }
}
//for(let i = 0; i < ingredients.length; i++) {
//}


function is_ingredient_fresh(ingredient:number, fresh_ranges:string[]) {
    var is_fresh: boolean = false;

    for(const fresh_range of fresh_ranges) {
        var slice_index = fresh_range.indexOf("-");
        var range_start = Number(fresh_range.slice(0, slice_index));
        var range_end   = Number(fresh_range.slice(slice_index + 1));

        if(ingredient >= range_start && ingredient <= range_end) {
            return true;
        }

    }

    return false;
}

console.log(data_arr);
console.log(ingredients);
console.log(fresh_ranges);
console.log(log_arr);
console.log(sum);