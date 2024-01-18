/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs'

inquirer
  .prompt([
    /* Pass your questions in here */
    {name: 'URL', message: 'Enter a URL'}
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    const url = answers.url;
    const qr_png = qr.image(url);
    qr_png.pipe(fs.createWriteStream('qr-code-hassan.png'));

    // create text file with user input
    fs.writeFile('URL.txt', url, (err) => {
      if (err) throw err;
      console.log('File has been saved!');
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log(error);
    } else {
      // Something else went wrong
      console.log(error);
    }
  });
