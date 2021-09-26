import express from "express";
import { AnnotationResponse } from "./baseAnnotator";
import helloLinter from "./annotators/helloLint";
var bodyParser = require("body-parser");
const app = express();
const port = 3000;

var jsonParser = bodyParser.json();

app.get("/", (req, res) => res.send("Express + xfdsfd Server"));

app.post("/annotate", jsonParser, (req, res) => {
  // tslint:disable-next-line:no-console
  console.log(req);
  const { text, annotators } = req.body;
  const annotationResponses: AnnotationResponse[] = [];
  for (const annotator of annotators) {
    if (annotator === "helloLint") {
      const annotationResponse = helloLinter(text);
      annotationResponses.push(annotationResponse);
    } else {
      throw new Error(`Unknown annotator: ${annotator}`);
    }
    console.log("hello");
  }
  res.send(JSON.stringify(annotationResponses));
});

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Example app listening at http://localhost:${port}`);
});
