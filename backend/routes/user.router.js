const express = require('express');
const passport = require('passport');
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
    .catch((error) => {
      return next(error);
    });
});
module.exports = userRouter;
