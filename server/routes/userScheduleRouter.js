const router = require('express').Router();
const { Op } = require('sequelize');
const { Schedule } = require('../db/models');
const { Trainer } = require('../db/models');
const { User } = require('../db/models');

async function createOrders(startTime, trainerId, date, sport, userId) {
  const currentSchedule = await Schedule.findOne({
    where: {
      trainerId,
      date,
      startTime,
    },
  });

  if (currentSchedule.userId) {
    throw new Error('Выбранное время уже занято');
    // return res.status(500).json({ error: 'Время занято' });
  }

  await currentSchedule.update({
    sport,
    userId,
    updatedAt: new Date(),
  });
  await currentSchedule.save();
  return undefined;
  // FIXME: надо вернуть rejected в промис
  // return res.status(500).json({ error: error.message });
}

router.route('/')
  .get(async (req, res) => {
    const { id } = req.user;

    try {
      const orders = await Schedule.findAll({
        where: { userId: id },
        attributes: ['date', 'startTime', 'sport'],
        order: [['date', 'ASC'], ['startTime', 'ASC']],
        include: {
          model: Trainer,
          attributes: ['id', 'name', 'surname', 'phone', 'photo'],
        },
        raw: true,
      });

      return res.status(200).json({ orders });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  })
  .post(async (req, res) => {
    const { id: userId } = req.user;

    const {
      trainerId,
      date,
      sport,
      hours,
    } = req.body;
    try {
      await Promise.all(hours
        .map((startTime) => createOrders(startTime, trainerId, date, sport, userId)));
      // FIXME: разобраться со статусами ответов
      return res.sendStatus(201);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  })
  .delete(async (req, res) => {
    const { id } = req.user;
    const {
      date,
      startTime,
      trainerId,
    } = req.body;

    try {
      const selectOrder = await Schedule.findOne({
        where: {
          date,
          startTime,
          trainerId,
        },
      });

      if (id === selectOrder.userId) {
        await selectOrder.update({
          sport: null,
          userId: null,
          updatedAt: new Date(),
        });

        await selectOrder.save();
        res.sendStatus(200);
      } else {
        res.status(403).json({ message: 'Ошибка доступа' });
      }
    } catch (error) {
      res.status(502).json({ error });
    }
  });

module.exports = router;
