const path = require("path");
const express = require("express");
const multer = require("multer");

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    return res.render("homePage");
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage: storage});

app.post("/upload", upload.single("profileImage"), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    res.end('Image Uploaded');
});

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
