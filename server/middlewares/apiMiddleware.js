const lodash = require('lodash');
const bodyParser = require('body-parser');

module.exports = (app) => {
  app.all('/dc/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    // res.header('Access-Control-Allow-Headers', 'credentials');
    res.header('Access-Control-Expose-Headers', 'Access-Token');
    res.header('Access-Token', `${Math.random()}-token`);
    next();
  });

  // create application/json parser
  const jsonParser = bodyParser.json();

  // create application/x-www-form-urlencoded parser
  // const urlencodedParser = bodyParser.urlencoded({ extended: false });

  // POST /login gets urlencoded bodies
  app.post('/dc/login', jsonParser, (req, res) => {
    console.log(req.body); // eslint-disable-line  no-console
    res.json({
      code: '11111',
      msg: 'dfsdfdfd sdfsdfdsf',
      vo: {
        user: {
          username: 'bfan',
        },
      },
    });
  });

  // POST /refreshToken gets urlencoded bodies
  app.post('/dc/refreshToken', jsonParser, (req, res) => {
    console.log(req.body); // eslint-disable-line  no-console
    res.json({
      vo: {
      },
    });
  });

  // POST /logout gets urlencoded bodies
  app.post('/dc/logout', jsonParser, (req, res) => {
    console.log(req.body); // eslint-disable-line  no-console
    res.json({
      vo: {
        rslt: 'Logout success!',
      },
    });
  });

  app.post('/dc/init', jsonParser, (req, res) => {
    console.log(req.body); // eslint-disable-line  no-console
    res.json({
      vo: {
        sptlocales: 'zh,en,tw',
      },
    });
  });

  // POST /dc/l gets JSON bodies
  app.get('/dc/mdl/intl.json', jsonParser, (req, res) => {
    // console.log(req.query.locale); // eslint-disable-line  no-console
    console.log(req.query); // eslint-disable-line  no-console
    const mdArr = req.query.module.split(',');
    const rslt = {};
    if (req.query.locale === 'zh'
      && lodash.indexOf(mdArr, 'home') > -1) {
      lodash.merge(rslt,
        {
          'global.appname': 'Act',
          'auth.login': 'Login',
          'auth.logout': 'Logout',
          'locale.en': 'Eglish',
          'locale.zh': 'Chinese',
        }
      );
    } else if (req.query.locale === 'en'
      && lodash.indexOf(mdArr, 'home') > -1) {
      lodash.merge(rslt,
        {
          'global.appname': 'Act_en',
          'auth.login': 'Login_en',
          'auth.logout': 'Logout_en',
          'locale.en': 'Eglish_en',
          'locale.zh': 'Chinese_en',
        }
      );
    }

    if (req.query.locale === 'zh'
      && lodash.indexOf(mdArr, 'login') > -1) {
      lodash.merge(rslt,
        {
          'auth.username': 'username',
          'auth.pwd': 'password',
        }
      );
    } else if (req.query.locale === 'en'
      && lodash.indexOf(mdArr, 'login') > -1) {
      lodash.merge(rslt,
        {
          'auth.username': 'username_en',
          'auth.pwd': 'username_en',
        }
      );
    }
    res.json({
      vo: rslt,
    });
  });
};
