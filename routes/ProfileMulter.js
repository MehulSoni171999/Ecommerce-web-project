const multer =require('multer');
const { dirname } = require('path');
const path=require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join("./profilepics/"));
    },
    filename: function (req, file, cb) {
      const  fn=  Date.now()+ Math.floor(Math.random())*100000000000+ file.originalname;
      cb(null, fn)
    }
  })
  const upload = multer({ storage })
exports.Profileupload=multer({storage:storage});