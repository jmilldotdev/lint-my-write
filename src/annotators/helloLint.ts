import { AnnotationResponse, findInString } from "../baseAnnotator";

export default function helloLinter(text: string): AnnotationResponse {
  const annotationSpans = findInString(
    text,
    "hi world",
    "helloWorldAnnotation",
    "Replace with 'hello world'"
  );
  const annotationResponse: AnnotationResponse = {
    originalText: text,
    annotationSpans,
  };
  return annotationResponse;
}
