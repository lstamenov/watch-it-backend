import { Request as RequestT, Response as ResponseT, NextFunction } from 'express';

interface Request extends RequestT {
  user: { userId: number };
}

interface Response extends ResponseT {}

interface Next extends NextFunction {}

export { Request, Response, Next };
