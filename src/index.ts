import express from "express";
import { AnnotationResponse } from "./baseAnnotator";
import helloLinter from "./annotators/helloLint";
var bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Express + xfdsfd Server"));

app.post("/annotate", (req, res) => {
  // tslint:disable-next-line:no-console
  console.log(req.headers)
  console.log(req.body);
  const { text, annotators } = req.body;
  const annotationResponses: AnnotationResponse[] = [];
  for (const annotator of annotators) {
    if (annotator === "helloLint") {
      const annotationResponse = helloLinter(text);
      annotationResponses.push(annotationResponse);
    } else {
      throw new Error(`Unknown annotator: ${annotator}`);
    }
  }
  res.send(JSON.stringify(annotationResponses));
});

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Example app listening at http://localhost:${port}`);
});
