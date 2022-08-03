const { Router } = require('express');
const router = Router();
const axios = require('axios');
const {listCountries, countryById, countryByName} = require('../controllers/controllerCountry');

router.get('/', async(req, res) => {
    const {name, filter} = req.query;
    if(name || filter) {
      try {
        let detail = await countryByName(name, filter);
        res.status(200).send(detail);
      } catch (error) {
          res.status(404).send(error);
      }
    }
      else {
        try {
          let response = await axios.get('https://restcountries.com/v3/all');
          let info = await listCountries(response.data);
          res.send(info);
        } catch (error) {
            res.send(await listCountries())
        }        
      }
})

router.get('/:idPais', async(req, res) => { 
  const {idPais} = req.params;
    try {
      let detail = await countryById(idPais.toUpperCase());
      res.status(200).send(detail);
    } catch (error) {
        res.status(404).send(error);      
    }
})

module.exports = router;
