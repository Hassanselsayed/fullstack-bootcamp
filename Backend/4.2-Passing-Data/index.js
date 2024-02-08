import express from "express";
import bodyParser from "body-parser";
import e from "express";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render('index.ejs');
});

app.post("/submit", (req, res) => {
  const { fName } = req.body;
  res.render('index.ejs', {
    chars: fName.replace(/ /g, '').length
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
