import { Request as RequestT, Response as ResponseT, NextFunction } from 'express';
import { Movie, Show } from 'src/entities';

interface Request extends RequestT {
  user: { userId: number };
}

interface Response extends ResponseT {}

interface Next extends NextFunction {}

interface RequestOptions {
  path: string;
  queryParams?: Record<string, string>;
  body?: Record<string, unknown>;
}

interface MoviesApiReponse {
  results: Movie[];
}

interface ShowsApiReponse {
  results: Show[];
}

enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
  HEAD = 'HEAD',
}

export { Request, Response, Next, RequestOptions, HttpMethods, MoviesApiReponse, ShowsApiReponse };
