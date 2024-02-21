import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

const yourUsername = "helsayed";
const yourPassword = "helsayed";
const yourAPIKey = "14ca4896-b21c-47e1-b2f3-b576e2c77dc9";
const yourBearerToken = "e6a7dc68-c0f3-424e-b5bf-923e6db2cded";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}random`);
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    res.render("index.ejs", {
      content: error.message,
    });
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}all?page=2`, {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    res.render("index.ejs", {
      content: error.message,
    });
  }
});

app.get("/apiKey", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}filter?score=5&apiKey=${yourAPIKey}`);
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    res.render("index.ejs", {
      content: error.message,
    });
  }
});

app.get("/bearerToken", async (req, res) => {
 try {
   const response = await axios.get(`${API_URL}secrets/42`, {
    headers: {
      Authorization: `Bearer ${yourBearerToken}` 
    }
   })
   res.render("index.ejs", { content: JSON.stringify(response.data) });
 } catch (error) {
   res.render("index.ejs", {
     content: error.message,
   });
 }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
