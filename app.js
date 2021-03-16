// const express = require("express");
import express from "express";
import * as path from "path";

const __dirname = path.resolve();
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/home", (req, res) => {
  res.send("Hello World from home!");
});
app.get("/index.html", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/download", (req, res) => {
  res.download(path.join(__dirname, "index.html"));
});
app.get("/notfound", (req, res) => {
  res.status(404).end();
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

// app.get("/:filename", (req, res) => {
//   res.sendFile(path.join(__dirname, req.params.filename));
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
