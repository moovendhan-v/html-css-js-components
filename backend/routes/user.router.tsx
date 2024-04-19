import express, { Request, Response, NextFunction, Router } from 'express';
import passport from 'passport';

const userRouter: Router = express.Router();

userRouter.post('/register', (req: Request, res: Response, next: NextFunction) => {
  registerUser(req.body)
    .then((user: User) => {
      req.login(user, (err: Error) => {
        if (err) {
          return next(err);
        }
        return res.redirect('/dashboard');
      });
    })
    .catch((error: Error) => {
      return next(error);
    });
});

export default userRouter;