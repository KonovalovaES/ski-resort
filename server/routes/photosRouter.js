const router = require('express').Router();
const fs = require('fs');
const {
  middlewareHotel,
  middlewareComfortCottage,
  middlewareStandartCottage,
  middlewareComfortRoom,
  middlewareStandartRoom,
} = require('../middleware/uploadFile');

router.route('/1')
  .post(middlewareStandartRoom.single('image'), async (req, res) => {
    res.json({ image: req.file.filename });
  })
  .delete(async (req, res) => {
    const { image } = req.body;
    fs.unlink(`src/rooms/standartRoom/${image}`, (error) => {
      if (error) {
        return res.status(500).json({ isDelete: false, error: error.message });
      }
      return res.status(200).json({ isDelete: true });
    });
  });

router.route('/2')
  .post(middlewareComfortRoom.single('image'), async (req, res) => {
    res.json({ image: req.file.filename });
  })
  .delete(async (req, res) => {
    const { image } = req.body;
    fs.unlink(`src/rooms/comfortRoom/${image}`, (error) => {
      if (error) {
        return res.status(500).json({ isDelete: false, error: error.message });
      }
      return res.status(200).json({ isDelete: true });
    });
  });

router.route('/3')
  .post(middlewareStandartCottage.single('image'), async (req, res) => {
    res.json({ image: req.file.filename });
  })
  .delete(async (req, res) => {
    const { image } = req.body;
    fs.unlink(`src/rooms/standartCottage/${image}`, (error) => {
      if (error) {
        return res.status(500).json({ isDelete: false, error: error.message });
      }
      return res.status(200).json({ isDelete: true });
    });
  });

router.route('/4')
  .post(middlewareComfortCottage.single('image'), async (req, res) => {
    res.json({ image: req.file.filename });
  })
  .delete(async (req, res) => {
    const { image } = req.body;
    fs.unlink(`src/rooms/comfortCottage/${image}`, (error) => {
      if (error) {
        return res.status(500).json({ isDelete: false, error: error.message });
      }
      return res.status(200).json({ isDelete: true });
    });
  });

router.route('/5')
  .post(middlewareHotel.single('image'), async (req, res) => {
    res.json({ image: req.file.filename });
  })
  .delete(async (req, res) => {
    const { image } = req.body;
    fs.unlink(`src/rooms/hotel/${image}`, (error) => {
      if (error) {
        return res.status(500).json({ isDelete: false, error: error.message });
      }
      return res.status(200).json({ isDelete: true });
    });
  });

router.route('/')
  .get(async (req, res) => {
    const { folder } = req.headers;
    fs.readdir(`src${folder}`, (err, photos) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      return res.status(200).json({ photos });
    });
  });

module.exports = router;
