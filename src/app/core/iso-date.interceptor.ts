import { HttpResponse, type HttpInterceptorFn } from '@angular/common/http';
import { map } from 'rxjs';

const ISO8601_DATE_REGEX = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(.\d+)?(Z|[+-]\d{2}:\d{2})?)?$/;

export const isoDateInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    map((event) => (event instanceof HttpResponse ? event.clone({ body: convertIsoStringToDate(event.body) }) : event)),
  );
};
function convertIsoStringToDate(obj: unknown): unknown {
  // if obj is iso-string, parse
  if (typeof obj === 'string' && ISO8601_DATE_REGEX.test(obj)) {
    return new Date(obj);
  }

  // recursive call for each object key
  if (obj !== null && typeof obj === 'object') {
    const objWithIndex = obj as Record<string, unknown>;
    for (const key in objWithIndex) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        objWithIndex[key] = convertIsoStringToDate(objWithIndex[key]);
      }
    }
  }
  return obj;
}
