const router = require('express').Router();
const { User, Trainer, Admin } = require('../db/models');

const clearAttributes = require('../helpers/clearAttributes');

router.route('/')
  .get(async (req, res) => {
    // проверяем пришел ли токен
    if (req.user) {
      const { id, role } = req.user;

      // находим информацию в нужной таблице в зависимости от роли
      if (role === 'user') {
        let user;
        try {
          user = await User.findOne({
            where: { id },
          });
        } catch (err) {
          return res.status(500).json({ error: err.message });
        }

        if (!user) return res.sendStatus(404);

        const info = clearAttributes(user);
        return res.status(200).json({ info, role: 'user' });
      }

      if (role === 'trainer') {
        let trainer;
        try {
          trainer = await Trainer.findOne({
            where: { id },
          });
        } catch (err) {
          return res.status(500).json({ error: err.message });
        }

        if (!trainer) return res.sendStatus(404);

        const info = clearAttributes(trainer);
        return res.status(200).json({ info, role: 'trainer' });
      }

      if (role === 'admin') {
        let admin;
        try {
          admin = await Admin.findOne({
            where: { id },
          });
        } catch (err) {
          return res.status(500).json({ error: err.message });
        }

        if (!admin) return res.sendStatus(404);

        const info = clearAttributes(admin);
        return res.status(200).json({ info, role: 'admin' });
      }
    }

    return res.sendStatus(403);
  });

module.exports = router;
