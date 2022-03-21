const router = require('express').Router();
const { Type } = require('../db/models');

router.route('/')
  .get(async (req, res) => {
    try {
      const types = await Type.findAll({
        raw: true,
      });
      res.status(200).json({ types });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.route('/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    try {
      const type = await Type.findOne({
        where: { id },
        raw: true,
      });
      res.status(200).json(type);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
