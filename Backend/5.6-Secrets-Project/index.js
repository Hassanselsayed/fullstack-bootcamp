import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"))

app.get("/", async (req, res) => {
  const {data} = await axios.get("https://secrets-api.appbrewery.com/random");
  res.render("index.ejs", {
    secret: data.secret,
    user: data.username
  })
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
