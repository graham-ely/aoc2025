// 17:39 from start of 11
import * as fs from 'fs';

//const data_path: string = "11_data_test.txt";
const data_path: string   = "11_data.txt";
const data: string = fs.readFileSync(data_path, 'utf-8');
const data_arr: string[] = data.split(/\r?\n/);

var sum: number = 0;
var worksheet = [];


for(let i = 0; i < data_arr.length; i++) {
    worksheet[i] = data_arr[i].split(" ").filter(n => n);
}

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
}



function func(a :number, arr :string[]) {

    return false;
}

console.log(data_arr);
console.log(worksheet);
console.log(sum);

//84485124 too low