const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Trainer } = require('../db/models');
const isValid = require('../helpers/isValid');
const clearAttributes = require('../helpers/clearAttributes');
require('dotenv').config();
const trainerKey = require('../helpers/trainerKey');

router.route('/')
  .post(async (req, res) => {
    if (!isValid(req.body)) {
      return res.sendStatus(400);
    }

    const {
      name, surname, phone, email, password: passwordUnsec, secret,
    } = req.body;
    const password = await bcrypt.hash(passwordUnsec, 10);

    if (secret && secret !== trainerKey) return res.sendStatus(400);
    if (secret) {
      try {
        const trainer = await Trainer.create({
          name,
          surname,
          phone,
          email,
          password,
          ski: false,
          snowboard: false,

        });
        const info = clearAttributes(trainer);
        const token = jwt.sign({ role: 'trainer', id: trainer.id }, process.env.ACCESS_TOKEN_SECRET);
        return res.status(200).json({ token, info, role: 'trainer' });
      } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') return res.sendStatus(501);
        return res.status(500).json({ error: err.message });
      }
    }

    try {
      const user = await User.create({
        name, surname, phone, email, password,
      });
      const info = clearAttributes(user);
      const token = jwt.sign({ role: 'user', id: user.id }, process.env.ACCESS_TOKEN_SECRET);
      return res.status(200).json({ token, info, role: 'user' });
    } catch (err) {
      switch (err.original.constraint) {
        case 'Users_phone_key':
          return res.status(501).json({ message: 'changePhone' });
        case 'Users_email_key':
          return res.status(501).json({ message: 'changeEmail' });
        default:
          return res.status(500).json({ error: err.message });
      }
    }
  });

module.exports = router;
