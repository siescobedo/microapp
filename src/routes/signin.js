const KoaRouter = require('koa-router');
const sendExampleEmail = require('../mailers/example');
const {LocalStorage} = require('node-localstorage');

const router = new KoaRouter();
const localStorage = new LocalStorage('./scratch')

router.get('signin', '/', async (ctx) => {
  await ctx.render('signin/index', {
    notice: ctx.flashMessage.notice,
  });
});

router.post('signin', '/', async (ctx) => {
  const { userMail, userPassword } = ctx.request.body;
  const data = {   "data":
                {     "type": "users", 
                      "attributes":
                      {   "userMail": userMail, 
                          "userPassword": userPassword}   } } 

  var request = require('request');
  var options = {
                  'method': 'POST',
                  'url': 'https://gym-virtual.herokuapp.com/api/auth/signin',
                  'headers': {
                              'Content-Type': 'application/json'
                            },
                  body: JSON.stringify(data)
                          };
  request(options, function (error, response) {
          if (response.body !== 'Unauthorized') {
            var obj = JSON.parse(response.body);
            var token = obj['meta']['access_token'];
            localStorage.setItem('token', token);
          }
          if (error) throw new Error(error);
          });

  console.log('revisando si funciona')
  console.log(localStorage.getItem('token'))

  ctx.redirect(router.url('index'));
});

module.exports = router;
