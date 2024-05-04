function add (a, b) {
    return a+b;
}

function subract (a,b){
    return a-b;
} 


// module.exports = add;
// module.exports = subract;    //! it will overwrite the add function


// * we can also export as 
// exports.add = (a,b) => a+b;
// exports.sub = (a,b) => a-b;


module.exports = {
    addFn: add,
    subFn: subract
}




