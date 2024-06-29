import express from 'express';
import passport from 'passport';
const userRouter = express.Router();


userRouter.post('/register', (req, res, next) => {
  registerUser(req.body)
    .then((user) => {
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect('/dashboard');
      });
    })
    .catch(error => next(error));
});
export {userRouter};
 