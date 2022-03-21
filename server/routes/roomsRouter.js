const router = require('express').Router();
const { Room } = require('../db/models');
const { Type } = require('../db/models');

router.route('/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    try {
      const room = await Room.findOne({
        where: { id },
        attributes: [],
        include: {
          model: Type,
          attributes: ['title', 'guestCount', 'images'],
        },
        raw: true,
      });
      res.status(200).json({ room });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
