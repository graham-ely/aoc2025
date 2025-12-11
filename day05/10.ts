// 2:11:14 from start of 9 :(
import * as fs from 'fs';

//const data_path: string = "9_data_test.txt";
const data_path: string   = "9_data.txt";
const data: string = fs.readFileSync(data_path, 'utf-8');
const data_arr: string[] = data.split(/\r?\n/);

var sum: number = 0;
var split_index = data_arr.indexOf("");

var fresh_ranges_raw: string[] = data_arr.slice(0, split_index);
var fresh_ranges: Array<[number, number]> = [];
var fresh_ranges_original: Array<[number, number]> = [];
var combined_ranges: Array<[number, number]> = [];

// process input array
for(const fresh_range of fresh_ranges_raw) {
    var slice_index = fresh_range.indexOf("-");
    var range_start = Number(fresh_range.slice(0, slice_index));
    var range_end   = Number(fresh_range.slice(slice_index + 1));

    fresh_ranges.push([range_start, range_end]);
    fresh_ranges_original.push([range_start, range_end]);
}

var prev_len: number = -1;

while(prev_len != fresh_ranges.length) {
    prev_len = combined_ranges.length;
    combined_ranges = [];

    for(const fresh_range of fresh_ranges) {
        if(combined_ranges.length == 0) {
            combined_ranges.push([...fresh_range]);
        } else {
            var push_new: boolean = true;

            for(let [idx, existing_range] of combined_ranges.entries()) {
                if(fresh_range[0] > existing_range[1] || fresh_range[1] < existing_range[0]) {
                    // not within current bounds, could be a new range
                } else if (fresh_range[0] < existing_range[0]) {
                    if(fresh_range[1] < existing_range[1]) {
                        combined_ranges[idx][0] = fresh_range[0];
                        push_new = false;
                    } else {
                        combined_ranges[idx] = [...fresh_range];
                        push_new = false;
                    }
                } else if (fresh_range[0] >= existing_range[0]) {
                    if(fresh_range[1] <= existing_range[1]) {
                        // entirely within existing range, no push
                        push_new = false;
                    } else {
                        combined_ranges[idx][1] = fresh_range[1];
                        push_new = false;
                    }
                } else if (fresh_range[0] == existing_range[0] && fresh_range[1] == existing_range[1]) {
                    // duplicate
                    push_new = false;
                }
            }

            if(push_new == true) {
                combined_ranges.push([...fresh_range]);
            }
        }
    }

    fresh_ranges = [];
    combined_ranges.forEach((subArray) => fresh_ranges.push([...subArray]));
}

combined_ranges.sort(compare);

function compare(a:[number, number], b:[number, number]) {
    if(a[0] < b[0]) {
        return -1;
    } else if (a[0] > b[0]){
        return 1;
    }

    return 1;
}

for(const range of combined_ranges) {
    sum += ( range[1] - range[0] + 1 );
}

console.log(fresh_ranges_original)
console.log(combined_ranges);
console.log(sum);
