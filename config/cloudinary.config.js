/*const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');


const storage = new CloudinaryStorage( {
    cloudinary,
    folder: 'artis-profile', 

    allowedFormats: ['jpg', 'png'],
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
*/