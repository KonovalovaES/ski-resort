const router = require('express').Router();
const { Op } = require('sequelize');
const { Schedule, User } = require('../db/models');

router.route('/')
  .get(async (req, res) => {
    const { id } = req.user;

    const schedule = await Schedule.findAll({
      where: { trainerId: id },
      attributes: ['date', 'startTime', 'sport'],
      raw: true,
      include: {
        model: User,
        attributes: ['name', 'surname', 'phone'],
      },
    });

    res.status(200).json({ schedule });
  })
  .put(async (req, res) => {
    const { id } = req.user;
    const { days } = req.body;
    if (!days) return res.sendStatus(400);
    // TODO: в будущем сделать более гибкое расписание
    const possibleTime = ['09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22'];

    try {
      const cancelledDays = await Schedule.findAll({
        where: {
          trainerId: id,
          date: { [Op.notIn]: days },
        },
      });

      if (cancelledDays.length > 0) {
        await cancelledDays.forEach((day) => {
          day.destroy();
        });
      }

      // eslint-disable-next-line arrow-body-style
      await Promise.all(days.map((date) => {
        // eslint-disable-next-line arrow-body-style
        return Promise.all(possibleTime.map((startTime) => {
          return Schedule.findOrCreate({
            where: {
              trainerId: id,
              date,
              startTime,
            },
          });
        }));
      }));
      res.sendStatus(201);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
