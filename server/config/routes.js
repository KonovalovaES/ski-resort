const { createProxyMiddleware } = require('http-proxy-middleware');

const loginRouter = require('../routes/loginRouter');
const registrationRouter = require('../routes/registrationRouter');
const checkUserRouter = require('../routes/checkUserRouter');

const updateUserRouter = require('../routes/updateUserRouter');
const trainerScheduleRouter = require('../routes/trainerScheduleRouter');
const userScheduleRouter = require('../routes/userScheduleRouter');
const trainersRouter = require('../routes/trainersRouter');
const avaliableRouter = require('../routes/avaliableRouter');
const typesRouter = require('../routes/typesRouter');
const typesEditRouter = require('../routes/typesEditRouter');
const photosRouter = require('../routes/photosRouter');
const ordersRouter = require('../routes/ordersRouter');
const userOrdersRouter = require('../routes/userOrdersRouter');
const skiPassRouter = require('../routes/skiPassRouter');
const roomsRouter = require('../routes/roomsRouter');

const authUser = require('../middleware/authUser');

function routes(app) {
  app.use('/api/login', loginRouter);
  app.use('/api/registration', registrationRouter);
  app.use('/api/checkUser', authUser, checkUserRouter);
  app.use('/api/updateUser', authUser, updateUserRouter);
  app.use('/api/trainerSchedule', authUser, trainerScheduleRouter);
  app.use('/api/userSchedule', authUser, userScheduleRouter);
  app.use('/api/trainers', authUser, trainersRouter);
  app.use('/api/avaliable', avaliableRouter);
  app.use('/api/userOrders', authUser, userOrdersRouter);
  app.use('/api/types/edit', authUser, typesEditRouter);
  app.use('/api/skiPass', authUser, skiPassRouter);
  app.use('/api/types', typesRouter);
  app.use('/api/photos', photosRouter);
  app.use('/api/orders', ordersRouter);
  app.use('/api/rooms', roomsRouter);
  app.use(createProxyMiddleware(
    '/data',
    {
      target: 'https://api.openweathermap.org/',
      changeOrigin: true,
    },
  ));
}

module.exports = routes;
