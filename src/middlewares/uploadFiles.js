const multer = require('multer');
const path = require('path');

const storageProductIMG = multer.diskStorage(
    {
        destination: (req, file, callback) =>
        {
            callback(null, './public/images/products');
        },
        filename: (req, file, callback) =>
        {
            callback(null, `product-${Date.now()}${path.extname(file.originalname)}`);
        }
    }
);

const uploadProductIMG = multer({ storage : storageProductIMG });

module.exports = { uploadProductIMG };