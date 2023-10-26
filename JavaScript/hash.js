//used this to create md5 hash 

// first install crypto-js in JS terminal
npm install crypto-js

//created hash.js file and ran below code
let ts = new Date().getTime();
let PUBLIC_KEY = "1af980c964ec89cd3e70a22841cd6680";
let PRIVATE_KEY = "";//private key


var MD5 = require("crypto-js/md5"); 
console.log(MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString());

