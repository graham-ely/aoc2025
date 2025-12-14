// 48:00 from start of 11
import * as fs from 'fs';

//const data_path: string = "11_data_test.txt";
const data_path: string   = "11_data.txt";
const data: string = fs.readFileSync(data_path, 'utf-8');
const data_arr: string[] = data.split(/\r?\n/);

var sum: number = 0;
var worksheet: string[] = [];
var worksheet_transpose: string[] = [];

// reverse the strings
for(var datum of data_arr){
    worksheet.push(datum.split('').reverse().join(''));
}

// transpose the array to get the numbers (plus operators)
for(let i = 0; i < worksheet.length; i++) {
    for(let j = 0; j < worksheet[0].length; j++)
    {
        if(typeof worksheet_transpose[j] == 'undefined') {
            worksheet_transpose[j] = "";
        }

        worksheet_transpose[j] += worksheet[i][j];
    }
}

// remove spaces
for(var i = 0; i < worksheet_transpose.length; i++) {
    worksheet_transpose[i] = worksheet_transpose[i].split(" ").filter(n => n).join('');
}

var numbers: number[] = [];

for(var number of worksheet_transpose) {
    var len_num: number = number.length;

    if(len_num != 0) {
        if (number[len_num - 1] == "*") {
            numbers.push(Number(number.slice(0, len_num - 1)));

            var pro_column: number = 1;

            for(var num_to_pro of numbers){
                pro_column *= num_to_pro;
            }

            sum += pro_column;

            numbers = [];
        } else if (number[len_num - 1] == "+") {
            numbers.push(Number(number.slice(0, len_num - 1)));

            var sum_column: number = 0;

            for(var num_to_sum of numbers){
                sum_column += num_to_sum;
            }

            sum += sum_column;

            numbers = [];
        } else {
            numbers.push(Number(number));
        }
    }
}

console.log(data_arr);
console.log(worksheet);
console.log(worksheet_transpose);
console.log(sum);