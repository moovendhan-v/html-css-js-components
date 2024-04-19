app.post('/login', (req, res) => {
    // Check if the user credentials are valid
    const { username, password } = req.body;
    // Perform your authentication logic here
  
    // If the user is authenticated, generate a JWT token
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
  
    // Return the token to the client
    res.json({ token });
  });



  function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) {
      return res.sendStatus(401);
    }
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  }

  app.get('/protected', authenticateToken, (req, res) => {
    // Access the authenticated user's information
    console.log(req.user);
  
    // Handle the protected route logic here
    res.send('Protected route');
  });