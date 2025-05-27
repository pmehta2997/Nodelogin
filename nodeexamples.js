// // //const els\u{65} = 1;
// // const el\u{73} = 5;

// // var x = 1;

// // if (x === 1) {
// //   var x = 2;

// //   console.log(x);
// //   // Expected output: 2
// // }

// // console.log(x);
// // // Expected output: 2
// // //-----------------------
// // //redeclaration
// // var a = 1;
// // var a = 5;
// // console.log(a); // 2
// // var a;
// // console.log(a); // 2; not undefined
// var x = 0; // Declares x within file scope, then assigns it a value of 0.

// console.log(typeof z); // "undefined", since z doesn't exist yet

// function a() {
//   var y = 2; // Declares y within scope of function a, then assigns it a value of 2.

//   console.log(x, y); // 0 2

//   function b() {
//     x = 3; // Assigns 3 to existing file scoped x.
//     y = 4; // Assigns 4 to existing outer y.
//     z = 5; // Creates a new global variable z, and assigns it a value of 5.
//     // (Throws a ReferenceError in strict mode.)
//   }

//   b(); // Creates z as a global variable.
//   console.log(x, y, z); // 3 4 5
// }

// a(); // Also calls b.
// console.log(x, z); // 3 5
// console.log(typeof y); // "undefined", as y is local to function a


// // // 9  (00000000000000000000000000001001)
// // // 14 (00000000000000000000000000001110)

// // 14 ^ 9;
// // // 7  (00000000000000000000000000000111)

// // 14n ^ 9n; // 7n

// // class Rectangle {
// //   constructor(height, width) {
// //     this.height = height;
// //     this.width = width;
// //   }
// // }
// // const person = "Mike";
// // const age = 28;

// // function myTag(strings, personExp, ageExp) {
// //   const str0 = strings[0]; // "That "
// //   const str1 = strings[1]; // " is a "
// //   const str2 = strings[2]; // "."

// //   const ageStr = ageExp < 100 ? "youngster" : "centenarian";

// //   // We can even return a string built using a template literal
// //   return `${str0}${personExp}${str1}${ageStr}${str2}`;
// // }

// // const output = myTag`That ${person} is a ${age}.`;

// // console.log(output);
// // // That Mike is a youngster.


// const callHistory = [];

// function tag(strings, ...values) {
//   callHistory.push(strings);
//   // Return a freshly made object
//   return {};
// }

// function evaluateLiteral() {
//   return tag`Hello, ${"world"}!`;
// }

// console.log(evaluateLiteral() === evaluateLiteral()); // false; each time `tag` is called, it returns a new object
// console.log(callHistory[0] === callHistory[1]); // true; all evaluations of the same tagged literal would pass in the same strings array

// const node = document.getElementById("formula");
// MathJax.typesetClear([node]);
// // Throws in older ECMAScript versions (ES2016 and earlier)
// // SyntaxError: malformed Unicode character escape sequence
// node.textContent = String.raw`$\underline{u}$`;
// MathJax.typesetPromise([node]);

// function myStrictFunction() {
//   // Function-level strict mode syntax
//   "use strict";
//   function nested() {
//     return "And so am I!";
//   }
//   return `Hi! I'm a strict mode function! ${nested()}`;
// }
// function myNotStrictFunction() {
//   return "I'm not strict.";
// }

// "use strict";

// // Assignment to a non-writable global
// undefined = 5; // TypeError
// Infinity = 5; // TypeError

// // Assignment to a non-writable property
// const obj1 = {};
// Object.defineProperty(obj1, "x", { value: 42, writable: false });
// obj1.x = 9; // TypeError

// // Assignment to a getter-only property
// const obj2 = {
//   get x() {
//     return 17;
//   },
// };
// obj2.x = 5; // TypeError

// // Assignment to a new property on a non-extensible object
// const fixed = {};
// Object.preventExtensions(fixed);
// fixed.newProp = "ohai"; // TypeError

// "use strict";

// // Assignment to a non-writable global
// undefined = 5; // TypeError
// Infinity = 5; // TypeError

// // Assignment to a non-writable property
// const obj1 = {};
// Object.defineProperty(obj1, "x", { value: 42, writable: false });
// obj1.x = 9; // TypeError

// // Assignment to a getter-only property
// const obj2 = {
//   get x() {
//     return 17;
//   },
// };
// obj2.x = 5; // TypeError

// // Assignment to a new property on a non-extensible object
// const fixed = {};
// Object.preventExtensions(fixed);
// fixed.newProp = "ohai"; // TypeError

// var x=1;
//   let y=20;
//  const z=30;
//  x=5;
//  y=50;
//  z=60;
//  console.log(z);

//  var student ={ 
//   name:"John",
//   subjects: ["Math", "Science", "English"],
//   age: 20,
//   Number: 85

 
//  }
 
//  let array = [1,2,3,4,5];
//  console.log(array.length);
//  const val = array[3];
//  console.log(val);

 var student = ["sci", "maths"];
 var condition = student.map((student) => 
  student.length);
//console.log(condition);

let fruits = ['apple', 'banana'];
fruits.push('orange');
fruits.pop();
fruits.shift();
fruits.unshift("mango");

let num=[1,2,3,4];
let mul = num.map(n => n*2);

let evens= num.filter(n=>n%2 === 0)

let sum = num.reduce((acc, curr) => acc + curr, 0);

let found = num.find(n => n > 1);
//console.log(sum); 
let arr = new Array(3); 
const subjects = new Array("scis","maths", "gujarati","sanskrit", "hindi");
//console.log(subjects[0]);  
//console.log(subjects.length);     
//console.log(subjects.at(-1));
//console.log(subjects.filter(subject => subject.length > 4));
//console.log(subjects.find(subject => subject.length == 4));
//console.log(subjects.slice(-2,-1));
//console.log(subjects.indexOf("english"));
//console.log(subjects.indexOf("maths",3));


num.copyWithin(0,1,2);
//console.log(num);
const greet = (name) => {
  //console.log(`hello, ${name}`);
};
greet("rahul");

const isBelowValue = (currentValue) => currentValue < 40;
const array1 = [1, 30, 39, 42, 10, 13];
//console.log(array1.every(isBelowValue));

const isLargeNumber = (element) => element > 30;

//console.log(array1.findLastIndex(isLargeNumber));
 
const arr1 = [0, 1, 2, [3, 4]];
//console.log(arr1.flat());

const arr2 = [0, 1, [2, [3, [4, 5]]]];
//console.log(arr2.flat());
//console.log(arr2.flat(2));

const words = ['right', 'to', 'go', 'way', 'the'];
const sentence = words.reduceRight((acc, curr) => acc + ' ' + curr);

//console.log(sentence);

// const name = "mini";
// const greeting = `Hello, my name is ${name}!`;
// console.log(greeting);

// setTimeout(() => {
//   console.log("this is the first message");
// }, 5000);
// setTimeout(() => {
//   console.log("this is the second message");
// }, 3000);
// setTimeout(() => {
//   console.log("this is the third message");
// }, 1000);

// const mypromise = new Promise ((resolve,reject) => {
// const success = true;

// //async operation
// if(success){
//   resolve("it worked");
// }else{
//   reject("something went wrong");
// }
// });
// mypromise.then(result => {
//     console.log(result); // "It worked!"
//   })
//   .catch(error => {
//     console.error(error); // "Something went wrong."
//   });

//   "use strict";

// // Strict mode enabled for the entire script
// x = 3.14; // Throws an error because x is not declared

// function myFunction() {
//   "use strict";
//   y = 10; // Throws an error because y is not declared within the function
// }

// myFunction();
//   x = 3.14;       // This will not cause an error.
// myFunction();

// function myFunction() {
//   "use strict";
//   y = 3.14;   // This will cause an error
// }
// const multiplication = (numberOne, numberTwo) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (numberOne < 0 || numberTwo < 0) {
//                 return reject("Only positive numbers allowed");
//             }
//             resolve(numberOne * numberTwo);
//         }, 1000);
//     });
// };

const multiplication = (numberOne, numberTwo) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (numberOne < 0 || numberTwo < 0) {
                return reject("Only positive numbers allowed");
            }
            resolve(numberOne * numberTwo);
        }, 1000);
    });
};

// Call for positive numbers
multiplication(5, 3)
    .then((product) => {
        console.log("The product is:", product);
    })
    .catch((error) => {
        console.log(error);
    });

// Call for negative numbers
multiplication(5, -3)
    .then((product) => {
        console.log("The product is:", product);
    })
    .catch((error) => {
        console.log(error);
    });