import multer from "multer";
import path from "node:path";
import fs from "node:fs";

let folder = path.join(__dirname, "../uploads");

if (!fs.existsSync(folder)) {
  fs.mkdir(folder, () => {
    console.log("created");
  });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg");
  },
});

export const upload = multer({ storage: storage }).single("image");
