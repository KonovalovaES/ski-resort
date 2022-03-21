const router = require('express').Router();
const fs = require('fs');
const { Op } = require('sequelize');
const { middlewareAvatar } = require('../middleware/uploadFile');
const { Trainer } = require('../db/models');
const { Schedule } = require('../db/models');

router.route('/:id')
  .post(middlewareAvatar.single('photo'), async (req, res) => {
    const { id } = req.params;
    const filedata = req.file;

    try {
      const trainer = await Trainer.findOne({
        where: { id },
      });
      const prevPhoto = trainer.photo;
      await trainer.update({ photo: filedata.filename });
      trainer.save();

      fs.unlink(`src/photos/${prevPhoto}`, (err) => {
        if (err) console.log(err);
        else console.log(`Файл ${prevPhoto} удален`);
      });
      return res.status(200).json({ photo: filedata.filename });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

router.route('/')
  .get(async (req, res) => {
    const { sport, bookingdate: date } = req.headers;

    const sportCondition = (sport === 'ski') ? { ski: true } : { snowboard: true };
    try {
      // const trainers = await Schedule.findAll({
      //   where: { date, userId: null },
      //   attributes: [],
      //   group: 'Trainer.id',
      //   include: {
      //     model: Trainer,
      //     where: { ...sportCondition },
      //     attributes: ['id', 'name', 'surname'],
      //   },
      //   raw: true,
      // });

      const trainers = await Trainer.findAll({
        where: { ...sportCondition },
        attributes: ['id', 'name', 'surname'],
        include: {
          model: Schedule,
          where: { date },
          attributes: ['startTime', 'userId'],
        },
        raw: true,
      });
      return res.json(trainers);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });
module.exports = router;
