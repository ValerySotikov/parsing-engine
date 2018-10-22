const http = require('http');
const fs = require('fs');
const openurl = require('openurl');

const url = 'https://moikrug.ru/resumes';

const options = {
  host: 'moikrug.ru',
  path: '/resumes'
};

const request = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log(data);
  });
});
request.end();

// openurl.open(url);

// const usernames = document.getElementsByClassName('username');
// console.log(usernames);

const PORT = 3000;

module.exports = http.createServer().listen(PORT, (req, res) => {
  console.log('Server started at port', PORT);
});