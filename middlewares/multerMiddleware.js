
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});


//   csv

const fileFilter = (req, file, cb) => {

    if (file.mimetype === "text/csv") {
        cb(null, true)
    } else {
        cb(new Error("Only CSV files allowed"), false);
    }
}

const upload = multer({ storage, fileFilter })

module.exports = upload;