const { Router } = require('express')
const componentsRouter = Router()
const {getComponentsDetails , getLatestFiles} = require('../controller/components.controller')


// componentsRouter.get('/', getComponentsDetails);
componentsRouter.get('/latest', (req, res) => {
    // Assuming "buttons" is a dynamic category
    getLatestFiles("buttons", (err, files) => {
      if (err) {
        console.error(err);
        return res.status(500).json({err: `${err}`, error: 'Internal Server Error' });
      }
      // Respond with the array of objects
      res.json(files);
    });
  });

module.exports = {componentsRouter}