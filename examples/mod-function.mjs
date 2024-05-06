import exampleMod from "./mod/src/index.mjs";


function add (x, y) {
    return x + y;
}


// Run the original function.
console.log(add(400, 20));

// Write a few empty lines.
console.log();
console.log();
console.log();

// Modify the function.
add = exampleMod.injectFunction(add);
// helloWorld = exampleMod.injectFunction(() => console.log("Hello, world!"));

// Run the modified function.
console.log(add.toString());

console.log();
console.log();
console.log();

// Run the decorated function.
console.log(add(400, 20));

// const value = eval(sourceCode);

// console.log(value);
