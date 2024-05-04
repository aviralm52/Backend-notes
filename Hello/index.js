// const math = require('./math')   //! when single function is exported

// const {addFn, subFn} = require('./math')    //! when multiple function is exported, either they can be destructured or can be used as object
const math = require('./math')      

// console.log('value of math is: ', math(2,3));

// console.log(addFn(2,3))      //! use it when we destructure the functions
// console.log(subFn(2,3))

console.log(math.addFn(3,4))
console.log(math.subFn(3,4))