const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    let name = path.basename(file.originalname, ext);
    let date = new Date();
    let fileName = `${name}-${date.getHours()}h${date.getMinutes()}m${date.getSeconds()}s-${crypto.randomBytes(3).toString('hex')}${ext}`;
    cb(null, fileName);
  }
});

let upload = multer({ storage: diskStorage }).array('files');

module.exports = upload;