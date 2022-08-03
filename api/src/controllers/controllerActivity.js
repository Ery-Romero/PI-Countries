const {Op, Country, TouristActivity} = require('../db');

module.exports = {

    newActivity: async function(name, difficulty, duration, season, idCountries) { 
       if(!name) {
           throw 'Se debe ingresar el Nombre de la Actividad'
       }   
           else if(difficulty < 1 || difficulty > 5) {
               throw 'El valor de la Dificultad debe ser entre 1 y 5'
           }
                else {  
                    let period = season.charAt(0).toUpperCase().concat(season.slice(1).toLowerCase());  
                    const [activity, created] = await TouristActivity.findOrCreate({
                        where: {name},
                        defaults: {
                            name,
                            difficulty,
                            duration,
                            season: period
                            }
                    });
                    await activity.addCountries(idCountries)
                    if(!created) {
                        throw `La Actividad ${name} ya existe`;
                    }
                    return(activity);
                }    
    },

    filterActivity: async function(name) {
        if(name) {
            const filterAct = await TouristActivity.findOne({
                where: {
                    name: name
                },
                include: [{
                    model: Country,
                    attributes: ['fifa', 'name', 'continents', 'flags'],
                    through: {attributes: []}
                }]
            })
            return filterAct;
        }
            else {
                throw `La actividad ${name} no existe`
            }
    },

    allActivities : async function() {
        const baseActivity = await TouristActivity.findAll({
            include: [{
                model: Country,
                attributes: ['name', 'continents', 'flags'],
                through: {attributes: []}
            }]
        });
            return baseActivity;
    },

    tourism: async function(idCountry, idActivity) {
        let activity = await TouristActivity.findByPk(idActivity);
        let country = await Country.findByPk(idCountry);
/*         const actInCountry = await country.hasTouristActivities(idActivity);
 */        if(!activity) throw `El id ${idActivity} de la Actividad no existe`; 
            else if(!country) throw `El id ${idCountry} del País no existe`; 
/*                 else if(actInCountry) throw `The activity ${activity.name} already exists in the country ${country.name}`; */
                    else {
                        await activity.addCountries(idCountry);
                        return(activity);
                    } 
    }
}
