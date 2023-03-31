const fs = require('fs');
const path = require('path');
module.exports = {
  devServer: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, './.ionic/ssl/key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, './.ionic/ssl/cert.pem')),
      public: 'https://localhost:8080/',
    },
  },
};
