// 1:33:53 from start of 15
import * as fs from 'fs';

//const data_path: string = "15_data_test.txt";
const data_path: string   = "15_data.txt";
const data: string = fs.readFileSync(data_path, 'utf-8');
const data_arr: string[] = data.split(/\r?\n/);
const box_arr: number[][] = [];
const box_dist_arr: number[][] = [];
const lowest_from_point_arr: number[] = [];
var circuits: number[][] = [];

// process strings to tuples
for(let i = 0; i < data_arr.length; i++) {
    box_arr.push(data_arr[i].split(',').map(x => Number(x)));
}

// populate dist array w/ maxint
for(let i = 0; i < box_arr.length; i++) {
    var new_row = [];
    for(let j = 0; j < box_arr.length; j++) {
        new_row.push(Number.MAX_SAFE_INTEGER);
    }
    box_dist_arr.push(new_row);
}

// build array with distances between all points, only build top right half
for(let i = 0; i < box_arr.length; i++) {
    for(let j = i + 1; j < box_arr.length; j++) {
        var dist_between_boxes: number = calc_dist_between_boxes(box_arr[i], box_arr[j])
        box_dist_arr[i][j] = dist_between_boxes;
    }
}

// build array with lowest distance from each point
for(let i = 0; i < box_dist_arr.length; i++) {
    var lowest_distance: number = Number.MAX_SAFE_INTEGER;

    for(let j = i + 1; j < box_dist_arr.length; j++) {
        if(box_dist_arr[i][j] < lowest_distance) {
            lowest_distance = box_dist_arr[i][j];
        }
    }

    lowest_from_point_arr.push(lowest_distance);
}

for(var loops = 0; loops < 1000; loops++) {
    var find_lowest_return = find_lowest(lowest_from_point_arr);
    var lowest_idx  = find_lowest_return[0];
    var lowest_val  = find_lowest_return[1];
    var lowest_idx2 = box_dist_arr[lowest_idx].indexOf(lowest_val);

    // update lowest point array to next lowest point
    lowest_from_point_arr[lowest_idx] = find_next_lowest(box_dist_arr[lowest_idx], lowest_val);

    var circuit_idx: [number, number] = check_in_circuit(lowest_idx, lowest_idx2);

    // cases: both not, 1 in, 2 in, both in same, both in diff
    if(circuit_idx[0] < 0 && circuit_idx[1] < 0) {
        // both not in existing, add new
        circuits.push([lowest_idx, lowest_idx2])
    }
    else if(circuit_idx[0] == circuit_idx[1]) {
        // do nothing for both in same
    } else if(circuit_idx[0] >= 0 && circuit_idx[1] >= 0 && circuit_idx[0] != circuit_idx[1]) {
        // both in different circuits, connect those two circuits
        var new_circuit = [...circuits[circuit_idx[0]]];
        for(var i = 0; i < circuits[circuit_idx[1]].length; i++) {
            new_circuit.push(circuits[circuit_idx[1]][i]);
        }

        circuits[circuit_idx[1]] = new_circuit;
        circuits.splice(circuit_idx[0], 1);
    } else if (circuit_idx[0] >= 0) {
        // only 1 in circuit, add 2
        circuits[circuit_idx[0]].push(lowest_idx2);
    } else if (circuit_idx[1] >= 0) {
        // only 2 in circuit, add 1
        circuits[circuit_idx[1]].push(lowest_idx);
    }

}

var circuit_sizes: number[] = []

for(var circuit of circuits) {
    circuit_sizes.push(circuit.length);
}

circuit_sizes.sort((a, b) => Number(b) - Number(a));

const largest_3_product = circuit_sizes[0] * circuit_sizes[1] * circuit_sizes[2];

function calc_dist_between_boxes(box1: number[], box2: number[]): number {
    return Math.sqrt(Math.pow(box1[0] - box2[0], 2) + Math.pow(box1[1] - box2[1], 2) + Math.pow(box1[2] - box2[2], 2));
}

function find_lowest(point_arr: number[]) {

    var lowest_distance: number = Number.MAX_SAFE_INTEGER;
    var lowest_index: number = 0;

    for(let i = 0; i < point_arr.length; i++) {
        if(point_arr[i] < lowest_distance) {
            lowest_distance = point_arr[i];
            lowest_index = i;
        }
    }

    return [lowest_index, lowest_distance];

}

function find_next_lowest(point_arr: number[], curr_lowest: number) {

    var next_lowest_distance: number = Number.MAX_SAFE_INTEGER;

    for(let i = 0; i < point_arr.length; i++) {
        if(point_arr[i] < next_lowest_distance && point_arr[i] > curr_lowest) {
            next_lowest_distance = point_arr[i];
        }
    }

    return next_lowest_distance;

}

// checking based on point index rather than point itself
// cases: both in circuit, 1 in circuit, none in circuit
function check_in_circuit(box1 :number, box2 :number): [number, number] {
    var circuit_box_1 = -1;
    var circuit_box_2 = -1;

    for(var i = 0; i < circuits.length; i++) {
        if(circuits[i].includes(box1)) {
            circuit_box_1 = i;
        }
        if(circuits[i].includes(box2)) {
            circuit_box_2 = i;
        }
    }

    return [circuit_box_1, circuit_box_2];
}

console.log(circuits)
console.log(circuit_sizes);
console.log(largest_3_product);