import { NextFunction, Request, Response } from 'express';
import ValidateError400 from '../errors/ValidateError400';
import ValidateError401 from '../errors/ValidateError401';
import ValidateError404 from '../errors/ValidateError404';
import ValidateError422 from '../errors/ValidateError422';

export default class ErrorMiddleware {
  static handleError(error: Error, req: Request, res: Response, _next: NextFunction) {
    if (error instanceof ValidateError400) {
      return res.status(400).json({ message: error.message });
    }

    if (error instanceof ValidateError401) {
      return res.status(401).json({ message: error.message });
    }

    if (error instanceof ValidateError404) {
      return res.status(404).json({ message: error.message });
    }

    if (error instanceof ValidateError422) {
      return res.status(422).json({ message: error.message });
    }

    console.error(error);
    res.status(500).json({ message: error.message });
  }
}
