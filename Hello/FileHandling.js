const fs = require("fs");

//TODO: Creating and writing file   -  blocking vs Non-Blocking code (synchronous vs asynchronous)
// fs.writeFileSync("./Hello/test.txt", "hello world"); //! it will write the create the file with given name and write the text in it

// fs.writeFile("./Helo/test2.txt", "hellooo world", (err) => {      //! this method also requires the callback function
//     console.log("Error is :  ",err);
// });


//TODO: Reading file
// const result = fs.readFileSync('./Hello/contacts.txt', 'utf-8')
// console.log(result);

// fs.readFile('./Hello/contacts.txt', 'utf-8', (err, data) => {   //! it does not return anything so we use callback, and it is also a async fn. so it does not block execution of other code while reading the file
//     if (err){
//         console.log("Error: ", err);
//     }else{
//         console.log(data);
//     }
// })


//TODO: Append file
// fs.appendFileSync('./Hello/contacts.txt', '\nNew line1');

// fs.appendFile('./Hello/contacts.txt', '\nNew line2', (err, data) => {
//     if (err){
//         console.log("Error: ", err);
//     }
// });


//TODO: Copy file
// fs.copyFileSync('./Hello/contacts.txt', './Hello/copy.txt')


//TODO: Delete file
// fs.unlinkSync('./Hello/copy.txt')


//TODO: Check status of file
// console.log(fs.statSync('./Hello/contacts.txt'))
// console.log(fs.statSync('./Hello/contacts.txt').isFile())


//TODO: Create directory
// fs.mkdirSync('./Hello/my-docs')
// fs.mkdirSync('./Hello/my-docs2/a/b/', {recursive: true})      //! creating folders inside folder




//* in blocking request the request goes to thread pool where it is processed by threads, by default there are 4 threads 
//* and if there are more blocking op. then they have to wait untill the thread is free, we can also increase the number of threads
//* but it depends on how many cores our CPU has
// const os = require('os');
// console.log(os.cpus().length)   //! our CPU has 8 cores, so we can increase thread count to 8