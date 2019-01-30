const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://beatrizf13:beatrizf13@ds145573.mlab.com:45573/upload-files',
  { useNewUrlParser: true },
);

module.exports = mongoose;
