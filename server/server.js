import express from "express";
import path from "path";
import multer from "multer";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {pdfmerger} from "./merge.js";

const app = express();
const upload = multer({ dest: "uploads/" });


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname,"templates")));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname, "templates/index.html"));
  });


app.post("/merge", upload.array("pdfs", 2), async (req, res, next) => {

        console.log(req.files);
        //run the padfmerger function thats takes two pdfs
        await pdfmerger(path.join(req.files[0].path), path.join(req.files[1].path));
        res.sendFile(path.join(__dirname, "merged/merged.pdf"));
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
