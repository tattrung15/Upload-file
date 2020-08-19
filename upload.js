//require('dotenv').config();
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const GridFsStorage = require("multer-gridfs-storage");

const mongoURI = process.env.MONGODB_URI;

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(5, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext);
        const date = new Date(new Date().getTime() + 7*60*60*1000);
        const filename = `${name}-${date.getHours()}h${date.getMinutes()}m${date.getSeconds()}s-${buf.toString('hex')}${ext}`;
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage }).single('file');

module.exports = upload;