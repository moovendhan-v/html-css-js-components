const { Router } = require('express')
const componentsRouter = Router()
const {getComponentsDetails , getLatestFiles} = require('../controller/components.controller')

// componentsRouter.get('/:test', getComponentsDetails);
componentsRouter.get('/latest', (req, res) => {
    const { category } = req.query;
    getLatestFiles(category, (err, files) => {
      if (err) {
        console.error(err);
        return res.status(500).json({err: `${err}`, error: 'Internal Server Error' });
      }
      res.json(files);
    });
  });


module.exports = {componentsRouter}