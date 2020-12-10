const fs = require('fs');

const upload = require('./upload');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('index');
  });

  app.get('/view', (req, res) => {
    res.render('view');
  });
  
  app.post('/upload', (req, res) => {
    if (!fs.existsSync('public/uploads')) {
      fs.mkdirSync('public/uploads');
    }
  
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
}