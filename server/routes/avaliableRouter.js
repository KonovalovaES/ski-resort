const router = require('express').Router();
const { Op } = require('sequelize');
const { Room, Order } = require('../db/models');

const authUser = require('../middleware/authUser');

const toStringDate = require('../helpers/toStringDate');

router.route('/')
  .get(async (req, res) => {
    const { start: startWish, finish: finishWish, type: typeString } = req.headers;
    const typeId = Number(typeString);
    try {
      // TODO: еределать в один запрос, если будет вермя
      const allRooms = await Room.findAll({
        where: { typeId },
        raw: true,
        attributes: ['id'],
      });

      const ordered = await Order.findAll({
        where: {
          [Op.and]: [{
            start: { [Op.gte]: startWish },
          }, {
            start: { [Op.lt]: finishWish },
          }],
        },
        group: ['roomId'],
        attributes: ['roomId'],
        raw: true,
      });

      const allRoomsArray = allRooms.map((room) => room.id);
      const orderedArray = ordered.map((room) => room.roomId);
      const avaliableArray = allRoomsArray.filter((room) => !orderedArray.includes(room));

      return res.status(200).json(avaliableArray);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  })
  .post(authUser, async (req, res) => {
    const { start, days, roomId } = req.body;
    const { id: userId } = req.user;
    let numDate = new Date(start).valueOf();
    const newBooking = [];

    for (let i = 0; i < days; i += 1) {
      newBooking.push({
        start: toStringDate(new Date(numDate)),
        userId,
        roomId,
      });
      numDate += 1000 * 60 * 60 * 24;
    }

    try {
      // FIXME: надо как-то транзакцию поставить, чтобы все разом создались
      await Promise.all(newBooking.map((newOrder) => Order.create(newOrder)));
      return res.sendStatus(201);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
