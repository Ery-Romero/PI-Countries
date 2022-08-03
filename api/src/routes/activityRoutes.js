const { Router } = require('express');
const router = Router();
const {newActivity, tourism, filterActivity, allActivities} = require('../controllers/controllerActivity') 

router.post('/new', async(req, res) => {
    const {name, difficulty, duration, season, idCountries} = req.body;
    console.log(name, difficulty, duration, season, idCountries)
    try {
        const load = await newActivity(name.toUpperCase(), difficulty, duration, season, idCountries);
        res.status(200).send(load);
    } catch (error) {
        res.status(404).send(error);
    }
});

router.get('/', async(req, res) => {
    const {name} = req.query;
    if(name) {
    console.log(name)
        try {
            const typeActivity = await filterActivity(name.toUpperCase());
            res.status(200).send(typeActivity);
        } catch (error) {
            res.status(404).send(error);
        }
    }
        else {
            try {
                const activities = await allActivities();
                res.status(200).send(activities);
            } catch (error) {
                res.status(404).send(error);
            }
        }
});

router.put('/:idCountry/:idActivity', async(req, res) => {
    const {idCountry, idActivity} = req.params;
    try {
        let relation = await tourism(idCountry.toUpperCase(), idActivity);
        res.status(200).send(relation);
    } catch (error) {
        res.status(404).send(error);
    }
})

module.exports = router;
