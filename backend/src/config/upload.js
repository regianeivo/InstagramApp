const multer = require('multer');
const path = require('path');

module.exports = {
   //configuracao do destino onde os arquivos vao, iria para pasta upload por padrao
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: function(req, file, cb) {
            cb(null, file.originalname);
        }
    })
};
