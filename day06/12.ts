// 48:00 from start of 11
import * as fs from 'fs';

//const data_path: string = "11_data_test.txt";
const data_path: string   = "11_data.txt";
const data: string = fs.readFileSync(data_path, 'utf-8');
const data_arr: string[] = data.split(/\r?\n/);

var sum: number = 0;
var worksheet = [];
var worksheet_transpose: string[] = [];

for(var datum of data_arr){
    worksheet.push(datum.split('').reverse().join(''));
}


for(let i = 0; i < worksheet.length; i++) {
    var transpose_string: string = "";

    for(let j = 0; j < worksheet[0].length; j++)
    {
        if(typeof worksheet_transpose[j] == 'undefined') {
            worksheet_transpose[j] = "";
        }

        worksheet_transpose[j] += worksheet[i][j];
    }

    //worksheet_transpose.push(transpose_string);
}

// remove spaces
for(var i = 0; i < worksheet_transpose.length; i++) {
    worksheet_transpose[i] = worksheet_transpose[i].split(" ").filter(n => n).join('');
}

var numbers: number[] = [];

for(var number of worksheet_transpose) {
    var len_num: number = number.length;

    if(len_num == 0) {

    } else if (number[len_num - 1] == "*") {
        numbers.push(Number(number.slice(0, len_num - 1)));

        var pro_column = 1;

        for(var num_to_pro of numbers){
            pro_column *= num_to_pro;
        }

        sum += pro_column;

        numbers = [];
    } else if (number[len_num - 1] == "+") {
        numbers.push(Number(number.slice(0, len_num - 1)));

        var sum_column = 0;

        for(var num_to_sum of numbers){
            sum_column += num_to_sum;
        }

        sum += sum_column;

        numbers = [];
    } else {
        numbers.push(Number(number));
    }

}



/*
for(let i = 0; i < worksheet[0].length; i++) {
    var len_worksheet = worksheet.length;

    if(worksheet[len_worksheet - 1][i] == "*") {
        var product_column = 1;

        for(var j = 0; j < len_worksheet - 1; j++){
            product_column *= Number(worksheet[j][i]);
        }

        sum += product_column;
    } else {
        var sum_column = 0;

        for(var j = 0; j < len_worksheet - 1; j++){
            sum_column += Number(worksheet[j][i]);
        }

        sum += sum_column;
    }
}*/



function func(a :number, arr :string[]) {

    return false;
}

console.log(data_arr);
console.log(worksheet);
console.log(worksheet_transpose);
console.log(sum);

//84485124 too low