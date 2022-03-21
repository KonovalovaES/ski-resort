const router = require('express').Router();
const { SkiPass, SkiPassOrder } = require('../db/models');

router.route('/')
  .get(async (req, res) => {
    try {
      const table = await SkiPass.findAll({
        raw: true,
        attributes: [
          'id',
          'amount',
          'type',
          'weekDayYoung',
          'weekDayOld',
          'weekEndYoung',
          'weekEndOld',
        ],
      });

      return res.status(200).json(table);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  })
  .post(async (req, res) => {
    const { typeId, skiPass, date } = req.body;
    try {
      await SkiPassOrder.create({ typeId, skiPass, date });
      return res.sendStatus(201);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
