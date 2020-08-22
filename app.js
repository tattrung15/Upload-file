//require('dotenv').config();
const upload = require('./upload');

const authMiddleware = require('./middleware/auth.middleware');

module.exports = (app, conn, mongoose) => {
  let gfs;
  conn.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: 'uploads',
    });
  });

  app.get('/', (req, res) => {
    res.render('index');
  });

  app.get('/login', (req, res) => {
    res.render('login');
  });

  app.post('/login', (req, res) => {
    if(req.body.password !== process.env.PASSWORD){
      res.sendStatus(401);
      return;
    }
    res.cookie('key', process.env.KEY_SECRET, {
      signed: true
    });
    gfs.find().toArray((err, files) => {
      return res.render('file', { filenames: files });
    });
  });

  app.post('/upload', (req, res) => {
    upload(req, res, (error) => {
      if (error) {
        return res.render('upload', {
          isSuccess: false,
          message: 'Upload failed!',
        });
      }
      res.render('upload', {
        isSuccess: true,
        message: 'Upload success!',
      });
    });
  });

  app.get('/files', authMiddleware.auth, (req, res) => {
    gfs.find().toArray((err, files) => {
      return res.render('file', { filenames: files });
    });
  });

  app.get('/file/:filename', (req, res) => {
    gfs.find({ filename: req.params.filename, }).toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: 'no files exist',
        });
      }
      gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    });
  });
};
