const router = require('express').Router();
const { Type } = require('../db/models');

router.route('/:id')
  .put(async (req, res) => {
    if (req.user.role !== 'admin') return res.sendStatus(403);

    const { id } = req.params;

    try {
      const type = await Type.findOne({ where: { id } });
      type.set(req.body);
      await type.save();
      return res.sendStatus(201);
    } catch (err) {
      return res.sendStatus(500).json({ error: err.message });
    }
  });

module.exports = router;
