const fs = require('fs');

// write/create a new file
// fs.writeFile("message.txt", "Hello Node", (err) => {
//   if (err) throw err;
//   console.log("The file has been saved!");
// });

// read from an existing file
// fs.readFile('./message.txt', 'utf8', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Who are you? ', name => {
  console.log(`Hey there ${name}!`);
  readline.close();
});
