/* eslint-disable no-console */
//* eslint-disable no-console */
function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }

  const middle = Math.floor(array.length / 2);
  let left = array.slice(0, middle);
  let right = array.slice(middle, array.length);

  left = mergeSort(left);
  right = mergeSort(right);
  return mergeSort(left, right, array);
}

mergeSort();

function merge(left, right, array) {
  let leftIndex = 0;
  let rightIndex = 0;
  let outputIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      array[outputIndex++] = left[leftIndex++];
    } else {
      array[outputIndex++] = right[rightIndex++];
    }
  }

  for (let i = leftIndex; i < left.length; i++) {
    array[outputIndex++] = left[i];
  }
  for(let i = rightIndex; i < right.length; i++) {
    array[outputIndex++] = right[i];
  }
  return array;
}

merge();

function quickSort(array, start = 0, end = array.length) {
  if (start >= end) {
    return array;
  }
  const middle = partition(array, start, end);
  array = quickSort(array, start, middle);
  array = quickSort(array, middle + 1, end);
  return array;
}

quickSort();

function partition(array, start, end) {
  const pivot = array[end - 1];
  let j = start;
  for (let i = start; i < end - 1; i++) {
    if (array[i] <= pivot) {
      swap(array, i, j);
      j++;
    }
  }
  swap(array, end-1, j);
  return j;
}

function swap(array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

//-------------exercises-----------

// 1
// given [21, 1, 26, 45, 29, 28, 2, 9, 16, 49, 39, 27, 43, 34, 46, 40]
// what is result after 3 recursive calls to mergeSort?
// [21, 1, 26, 45, 29, 28, 2, 9] -- [16, 49, 39, 27, 43, 34, 46, 40] --- 3rd recursion
// [21, 1, 26, 45] -- [29, 28, 2, 9] ----- [16, 49, 39, 27] -- [43, 34, 46, 40]
// [21, 1] -- [26, 45] --- [29, 28] -- [2, 9] ----- [16, 49] -- [43, 34] -- [46, 40]

// what is result that will be sorted after 16 recursive calls to mergeSort? -- [1]

// what are the two lists to be merged? [21] [1]

// which two lists would be merged on the 7th merge? 43 and 34

// -------------------

// 2
//  1 - [3 9 1 14 17 24 22 20]
//  False, the pivot could be either 17 or 14 since all other values are either less than 14 or greater than 17
//  True, the values to the left of 17 or 14 are all less values and to the right are greater values.
//  False, all other values are either greater or less than values to their left or right
//  False, the pivot could be both, values to the left or right of 14 and 17 are either less or greater than the said value

//  2 - [14, 17, 13, 15, 19, 10, 3, 16, 9, 12]
//  When using the last item as pivot:
//    1st partition: 10, 17, 13, 15, 19, 14, 3, 16, 9, 12
//    2nd partition: 10, 3, 13, 15, 19, 14, 17, 16, 9, 12

//  When using the first item as pivot:
//    1st partition: 14, 13, 17, 15, 19, 10, 3, 16, 9, 12
//    2nd partition: 14, 13, 10, 15, 19, 17, 3, 16, 9, 12 

// -------------------

const data = '89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 21 88 27 68 15 62 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 76 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5';
const dataset = data.split(' ').map(num => Number(num));

const LinkedList = require('./linked-list');
const _Node = require('./linked-list');

// number 3
function qSort(head) {
  if (head === null || head.next !== null) {
    return head;
  }

  let prev = null;
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    fast = fast.next.next;
    prev = slow;
    slow = slow.next;
  }

  prev.next = null;
  const list1 = qSort(head);
  const list2 = qSort(slow);

  return mSort(list1, list2);
}

qSort();

// number 4
function mSort(link1, link2) {
  const head = new _Node();
  let current = head;
  while(link1 !== null && link2 !== null) {
    if (link1.val < link2.val) {
      current.next = link1;
      link1 = link1.next;
    } else {
      current.next = link2;
      link2 = link2.next;
    }
    current = current.next;
  }
  current.next = link1 === null ? link2 : link1;
  return head.next;
}

//number 5
function main() {
  let sortll = new LinkedList();
  sortll.insertFirst(1);
  sortll.insertLast(5);
  sortll.insertLast(4);
  sortll.insertLast(3);
  sortll.insertLast(2);

  console.log(JSON.stringify(qSort(sortll.head), null, 2));
}
main();

//number 6
function bucketSort(array, low, high) {
  const newArray = [];
  for (let i = 0; i < high; i++) {
    newArray[i] = '';
  }
  for (let i = 0; i < array.length; i++) {
    newArray[array[i] - low] = array[i];
  }
  return newArray;
}
const bucketData = [8, 1, 9, 5, 4, 10, 6, 2, 3, 7];
console.log(bucketSort(bucketData, 1 , 10));


//number 7
function shuffleArray(array, counter = 0) {
  while (counter < array.length) {
    let randomIndex = Math.floor(Math.random() * array.length);
    swap(array, counter, randomIndex);
    counter++;
    return shuffleArray(array, counter);
  }
  return array;
}

let shuffleData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(shuffleArray(shuffleData));


//number 8
function sortBooks(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const middle = Math.floor(arr.length/2);
  let left = arr.slice(0, middle);
  let right = arr.slice(middle, arr.length);

  left = sortBooks(left);
  right = sortBooks(right);
  return merge(left, right, arr);
}

const books = [
  'Royal',
  'Where the Crawdads Sing',
  'The Jackal',
  'The Vanishing Half',
  'The Guest List',
  'Untamed',
  'Live Free or Die',
  'Caste',
  'Just Mercy',
  'Too Much and Never Enough',
  '28 Summers',
  'The Midwife Murders',
  'Lovecraft Country',
  'This Tender Land',
  'Little Fires Everywhere',
  'The New Jim Crow',
  'The Silent Patient',
  'American Dirt',
  'The Order',
  'Near Dark',
];

console.log(sortBooks(books));