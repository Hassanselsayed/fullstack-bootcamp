import express from "express";

const app = express();
const port = 3000;

const day = new Date().getDay();
// const day = 6;
let text = '';
console.log(day);
if (day === 0 || day === 6) {
  text = `It's the weekend, have fun!`;
} else {
  text = `It's a weekday, work work work!!`;
}

app.get("/", (req, res) => {
  res.render(
    'index.ejs',
    { text: text }
  );
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});