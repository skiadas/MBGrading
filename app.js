// const express = require("express");
import express from "express";
import cookieParser from "cookie-parser";
import formidableMiddleware from "express-formidable";
import * as path from "path";
import { addChatNeeds } from "./chat.js";
import pkg from "date-fns";
const { formatDistanceToNow } = pkg;
import hbs from "hbs";

const __dirname = path.resolve();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("static"));
app.use(formidableMiddleware()); // form processing
app.use(cookieParser()); // cookie processing
app.set("views", "./views");
app.set("view engine", "hbs");

hbs.registerHelper("formatDate", function (timestamp) {
  return formatDistanceToNow(timestamp);
});
hbs.registerHelper("newerThan", function (date1, date2) {
  return date1 > date2;
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/home", (req, res) => {
  res.send("Hello World from home!");
});
// app.get("/index.html", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });
// app.get("/style.css", (req, res) => {
//   res.sendFile(path.join(__dirname, "style.css"));
// });
app.get("/download", (req, res) => {
  res.download(path.join(__dirname, "static", "index.html"), "hello.html");
});
app.get("/notfound/:code", (req, res) => {
  res.status(parseInt(req.query.code)).end();
});
app.get("/json", (req, res) => {
  res.json({ hi: "there" });
});
app.get("/togoogle", (req, res) => {
  res.redirect("http://www.google.com");
});
app.get("/backtohome", (req, res) => {
  res.redirect("/home");
});
app.get("/random/:max", (req, res) => {
  const max = parseInt(req.params.max);
  res.json({ value: Math.floor(Math.random() * max) });
});
app.get("/info", (req, res) => {
  res.json({
    hostname: req.hostname,
    ip: req.ip,
    query: req.query,
  });
});

addChatNeeds(app);
// app.get("/:filename", (req, res) => {
//   res.sendFile(path.join(__dirname, req.params.filename));
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
