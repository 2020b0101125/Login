import multer from "multer";

const storage = multer.memoryStorage(); //no local saving used for cloudinary

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Only image files are allowed"), false);
};

const uploadImg = multer({ storage, fileFilter });

export default uploadImg;
