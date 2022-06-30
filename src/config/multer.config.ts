import multer from "multer";
import * as fs from "fs";
import * as path from "path";
import { POST_IMG_FOLDER } from "../../environments/environment";

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const jsonPath = path.join(__dirname, "..", "..", POST_IMG_FOLDER);
    if (!fs.existsSync(jsonPath)) {
      fs.mkdirSync(jsonPath);
    }
    cb(null, POST_IMG_FOLDER);
  },

  filename: function (req: any, file: any, cb: any) {
    cb(null, new Date().getTime().toString() + "_" + file.originalname);
  },
});

export const fileFilter = (req: any, file: any, cb: any) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
  }
};
