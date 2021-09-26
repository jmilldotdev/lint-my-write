export interface AnnotationSpan {
  startPosition: number;
  endPosition: number;
  annotationClass: string;
  suggestion?: string;
}

export interface AnnotationResponse {
  originalText: string;
  annotationSpans: AnnotationSpan[];
}

export function findInString(
  text: string,
  searchKeyword: string,
  annotationClass: string,
  suggestion?: string
): AnnotationSpan[] {
  const spans: AnnotationSpan[] = [];

  let indexOccurence = text.indexOf(searchKeyword, 0);

  while (indexOccurence >= 0) {
    const annotationSpan: AnnotationSpan = {
      startPosition: indexOccurence,
      endPosition: indexOccurence + searchKeyword.length,
      annotationClass,
      suggestion,
    };
    spans.push(annotationSpan);

    indexOccurence = text.indexOf(searchKeyword, indexOccurence + 1);
  }

  return spans;
}
