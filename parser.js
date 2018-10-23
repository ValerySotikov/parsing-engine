const needle = require('needle');
const cheerio = require('cheerio');
const resourceURL = 'https://moikrug.ru';

let urls = [];
let $;
let users = [];

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

    needle('get', resourceURL + itemUrl ).then((res) => {
      $ = cheerio.load(res.body);

      let user = {};
      user.userName = $('.user_name a').text();
      user.jobTitle = [];

      $('.profession').map((index, item) => {
        user.jobTitle.push(item.children[0].data);
      });

      user.jobTitle = user.jobTitle.join(' ');

      let skills = [];

      $('.skills a').map((index, item) => {
        skills.push(item.children[0].data);
      });

      user.skills = skills;
      users.push(user);

      user.activity = {
        signupDate: '',
        lastVisit: ''
      };

      let result = $('.activities .row .value').map((index, item) => {
        return item.children[0].data;
      });
      console.log(result);
    });
  });
}).then(() => {
  console.log('Successful data fetching...');
  setTimeout(() => {
    console.log(users);
  }, 3000);
});
