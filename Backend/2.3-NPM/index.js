// var generateName = require("sillyname");

import generateName from 'sillyname'
import superheroes from 'superheroes'

const sillyName = generateName();
console.log(`My name is ${sillyName}!`);

const superhero = superheroes.random();
console.log(`I am ${superhero}!`);