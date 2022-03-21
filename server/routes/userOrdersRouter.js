const router = require('express').Router();
const { Order } = require('../db/models');

async function checkRights(id, userId) {
  const order = await Order.findOne({ where: { id, userId } });
  if (order) return;
  throw new Error('Not allowed');
}

router.route('/')
  .get(async (req, res) => {
    const { id: userId } = req.user;
    try {
      const allOrders = await Order.findAll({
        where: { userId },
        order: [['roomId', 'ASC'], ['start', 'ASC']],
        attributes: ['id', 'start', 'roomId'],
        raw: true,
      });

      if (allOrders.length === 0) return res.sendStatus(404);

      return res.status(200).json(allOrders);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  })
  .delete(async (req, res) => {
    const { ids } = req.body;
    const userId = req.user.id;

    try {
      await Promise.all(ids.map((id) => checkRights(id, userId)));
      await Promise.all(ids.map((id) => Order.destroy({ where: { id } })));
      return res.sendStatus(200);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  });

module.exports = router;
