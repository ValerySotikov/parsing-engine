const needle = require('needle');
const cheerio = require('cheerio');
const download = require('download-pdf');
const resourceURL = 'https://moikrug.ru';

let urls = [];
let $;

needle('get', resourceURL + '/resumes').then((res) => {

  $ = cheerio.load(res.body);
  $('.username a').map((index, item) => {
    urls.push(item.attribs.href);
  });

}).then(() => {

  console.log('Successful GET urls');
  console.log(urls);

}).then(() => {
  urls.forEach((itemUrl) => {
    const url = resourceURL + itemUrl;
    let userName;

    needle('get', url).then((res) => {
      $ = cheerio.load(res.body);

      userName = $('.user_name a').text();

    }).then(() => {
      let pdf = url + '/print.pdf';

      let config = {
        directory: './resumes',
        filename: userName + '.pdf'
      };

      download(pdf, config, err => {
        if (err) throw err;
        console.log(userName,'-','downloaded...');
      });
    });
  });
});