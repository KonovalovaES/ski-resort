const router = require('express').Router();
const { Order } = require('../db/models');
const { Room } = require('../db/models');
const { Type } = require('../db/models');
const { User } = require('../db/models');

router.route('/:id/:date')
  .get(async (req, res) => {
    const { id, date } = req.params;

    try {
      const order = await Order.findOne({
        where: {
          roomId: +id,
          start: date,
        },
        include: {
          model: User,
          attributes: ['name', 'surname', 'phone', 'email'],
        },
        raw: true,
      });

      res.status(200).json({ order });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.route('/')
  .get(async (req, res) => {
    const { form, type } = req.headers;
    let newType;
    if (type === 'comfort') {
      newType = 'Комфорт';
    } else if (type === 'standart') {
      newType = 'Стандарт';
    }

    try {
      const allOrders = await Order.findAll({
        attributes: ['id', 'start', 'roomId', 'userId'],
        include: {
          model: Room,
          attributes: ['id', 'typeId'],
          include: {
            model: Type,
            attributes: ['id', 'form', 'title'],
          },
        },
        raw: true,
      });

      const allRooms = await Room.findAll({
        attributes: ['id'],
        include: {
          model: Type,
          where: {
            form,
          },
          attributes: ['id', 'form', 'title'],
        },
        raw: true,
      });

      let orders;
      let rooms;

      if (form !== 'hotel') {
        orders = allOrders.filter((el) => el['Room.Type.form'] === form && el['Room.Type.title'].includes(newType));
        rooms = allRooms.filter((el) => el['Type.title'].includes(newType));
      } else {
        orders = allOrders.filter((el) => el['Room.Type.form'] === form);
        rooms = [...allRooms];
      }

      res.status(200).json({ orders, rooms });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
