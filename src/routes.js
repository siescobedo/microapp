const KoaRouter = require('koa-router');

const signin = require('./routes/signin');
const index = require('./routes/index');

const router = new KoaRouter();

router.use('/', index.routes());
router.use('/signin', signin.routes());

module.exports = router;
