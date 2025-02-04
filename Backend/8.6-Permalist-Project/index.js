import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import calcTable from "./calendar-config.js";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  database: "permalist",
  port: 5432,
  host: "localhost",
  password: "postgrespass"
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [];
let emptyTitleError = false;
let titleLengthError = false;
let sort = 'id';
let sortDirection = 'ASC';
let view = 'list';
const today = new Date();
let year = today.getFullYear();
let displayedMonth = today.getMonth();
const currentMonth = today.getMonth();
const currentDay = today.getDate()

const months = ["January", "February", "March", "April", "May", "June", "July",
"August", "September", "October", "November", "December"];

const getData = async () => {
  const dbResult = await db.query(`SELECT * FROM items ORDER BY ${sort} ${sortDirection};`)
  items = dbResult.rows
}


app.get("/", async (req, res) => { 
  try {
    await getData();
    res.render("index.ejs", {
      listTitle: "To Do List",
      listItems: items,
      emptyTitleError,
      titleLengthError,
      sort,
      sortDirection,
      view,
      calendar: calcTable(year),
      months,
      displayedMonth,
      currentMonth,
      currentDay,
      year,
    });
    emptyTitleError = false;
    titleLengthError = false;
  } catch (err) {
    console.log(err);
  }
});

app.post("/add", async (req, res) => {
  try {  
    if (req.body.newItem !== '' && req.body.newItem.length <= 20) {
      await db.query(
        "INSERT INTO items (title, complete_by) VALUES ($1, $2);",
        [req.body.newItem, req.body.newItemDate]
      );
    } else if (req.body.newItem.length > 20) {
      titleLengthError = true;
    } else {
      emptyTitleError = true;
    }
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/edit", async (req, res) => {
  try {
    if (req.body.updatedItemTitle === '') {
      emptyTitleError = true;
    } else if (req.body.updatedItemTitle.length > 20) {
      titleLengthError = true;
    } else if (req.body.updatedItemDate) {
      await db.query(
        "UPDATE items SET title=$1, complete_by=$2 WHERE id=$3;",
        [req.body.updatedItemTitle, req.body.updatedItemDate, req.body.updatedItemId]
      );
    } else {
      await db.query(
        "UPDATE items SET title=$1 WHERE id=$2;",
        [req.body.updatedItemTitle, req.body.updatedItemId]
      );
    }
  
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/delete", async (req, res) => {
  try {
    await db.query(
      "DELETE FROM items WHERE id=$1;",
      [req.body.deleteItemId]
    );
    
  
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/sort", async (req, res) => {
  try {
    sort = sort === req.body.sort ? sort : req.body.sort
    sortDirection = sortDirection === req.body.sortDirection ? sortDirection : req.body.sortDirection
  
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/view", async (req, res) => {
  view = req.body.view;  
  
  res.redirect("/");
});

app.post("/year", async (req, res) => {
  year = req.query.year;
  res.redirect("/");
});

app.post("/month", async (req, res) => {
  if (req.body.month === '12' && req.body.direction === 'next') {
    displayedMonth = 0;
    year++;
  } else if (req.body.month === '-1' && req.body.direction === 'prev') {
    displayedMonth = 11;
    year--;
  } else {
    displayedMonth = +req.body.month;
  }  
  
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port} --> http://localhost:${port}`);
});