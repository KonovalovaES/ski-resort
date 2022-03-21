const multer = require('multer');

const storageAvatar = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'src/photos/');
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}-${String(new Date())}`);
  },
});

const storageImageStandartRoom = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'src/rooms/standartRoom');
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}-${String(new Date())}`);
  },
});

const storageImageComfortRoom = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'src/rooms/comfortRoom');
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}-${String(new Date())}`);
  },
});

const storageImageStandartCottage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'src/rooms/standartCottage');
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}-${String(new Date())}`);
  },
});

const storageImageComfortCottage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'src/rooms/comfortCottage');
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}-${String(new Date())}`);
  },
});

const storageImageHotel = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'src/rooms/hotel');
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}-${String(new Date())}`);
  },
});

const types = ['image/png', 'image/jpg', 'image/jpeg'];

const fileFilter = (req, file, cb) => {
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const middlewareAvatar = multer({ storage: storageAvatar, fileFilter });
const middlewareHotel = multer({ storage: storageImageHotel, fileFilter });
const middlewareComfortCottage = multer({ storage: storageImageComfortCottage, fileFilter });
const middlewareStandartCottage = multer({ storage: storageImageStandartCottage, fileFilter });
const middlewareComfortRoom = multer({ storage: storageImageComfortRoom, fileFilter });
const middlewareStandartRoom = multer({ storage: storageImageStandartRoom, fileFilter });

module.exports = {
  middlewareAvatar,
  middlewareHotel,
  middlewareComfortCottage,
  middlewareStandartCottage,
  middlewareComfortRoom,
  middlewareStandartRoom,
};
