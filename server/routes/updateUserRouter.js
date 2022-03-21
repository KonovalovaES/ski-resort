const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Trainer, Admin } = require('../db/models');
const clearAttributes = require('../helpers/clearAttributes');

async function update(person, req, res) {
  try {
    person.set(req.body);
    await person.save();
    const info = clearAttributes(person);
    return res.status(201).json({ info });
  } catch (err) {
    switch (err.original.constraint.split('_')[1]) {
      case 'phone':
        return res.status(501).json({ message: 'changePhone' });
      case 'email':
        return res.status(501).json({ message: 'changeEmail' });
      default:
        return res.status(500).json({ error: err.message });
    }
  }
}

router.route('/')
  .put(async (req, res) => {
    const { id, role } = req.user;
    const { passwordOld, password } = req.body;

    // FIXME: сделать общую валидацию данных
    let person;

    switch (role) {
      case 'trainer':
        try {
          person = await Trainer.findOne({ where: { id } });
          if (!person) return res.sendStatus(404);
        } catch (err) {
          return res.status(500).json({ error: err.message });
        }
        break;
      case 'user':
        try {
          person = await User.findOne({ where: { id } });
          if (!person) return res.sendStatus(404);
        } catch (err) {
          return res.status(500).json({ error: err.message });
        }
        break;
      case 'admin':
        try {
          person = await Admin.findOne({ where: { id } });
          if (!person) return res.sendStatus(404);
        } catch (err) {
          return res.status(500).json({ error: err.message });
        }
        break;
      default:
        return res.sendStatus(401);
    }

    if (!passwordOld) return update(person, req, res);

    if (await bcrypt.compare(passwordOld, person.password)) {
      const newPassword = await bcrypt.hash(password, 10);
      person.password = newPassword;
      // затираем старый пароль, вместо него мы назанчили новый зашифрованный
      delete req.body.password;
      return update(person, req, res);
    }

    return res.sendStatus(403);
  });

module.exports = router;
