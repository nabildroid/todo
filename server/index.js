import Express from "express";
import  React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { readFileSync } from "fs";

import App from "../src/app";

const PORT = process.env.PORT || 3000;

const html = readFileSync("../dist/index.html").toString();

const parts = html.split("not rendering");

const app = Express();

app.use("/dist", Express.static("dist"));
app.use((req, res) => {
  const ReactStatic = React.createElement(StaticRouter, {
    location: req.url,
    children: React.createElement(App),
  });
  res.send(parts[0] + renderToString(ReactStatic) + parts[1]);
  res.end();
});

console.log("listening on port " + PORT);
app.listen(PORT);
