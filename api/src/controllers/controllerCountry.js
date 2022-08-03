const {Op, Country, TouristActivity} = require('../db');

module.exports = {

    listCountries: async function(data) {
        if(data) {
            let id = 1;
            let obj = {};
            let load = data.map(e => {
                obj = {
                    fifa: e.fifa ? e.fifa : `${id++}`,
                    name: e.name ? e.name.common.toUpperCase() : "msg: No tiene Nombre",
                    flags: e.flags ? e.flags[0] : e.flags[1]? e.flags[1] : "msg: No tiene Bandera",
                    continents: e.continents ? e.continents[0] : "msg: No tiene Continente",
                    capital: e.capital ? e.capital[0] : "msg: No tiene Capital",
                    subregion: e.subregion,
                    area: e.area,
                    population: e.population
                }
                return obj;
            })
            await Country.bulkCreate(load);
            return load;
        }
            else {
                let baseCountry = await Country.findAll();
                return baseCountry;
            }
    },

    countryById: async function(id) {
        let byId = await Country.findByPk(id,
            {include: [{
                model: TouristActivity,
                attributes: ['name', 'difficulty', 'duration', 'season'],
                through: {attributes: []}
            }]});
        
        if(!byId) {
            throw "El id requerido no existe";            
            }
                else {
                    return byId;
                } 
    },

    countryByName: async function(name, filter) {
        if(name) {   
        let nombre = name.toUpperCase();
        let byName = await Country.findAll({
            where: {
                name: nombre
            },
            include: [{
                model: TouristActivity,
                attributes: ['name', 'difficulty', 'duration', 'season'],
                through: {attributes: []}
            }]});
        if(byName.length === 0) {
            throw "El País requerido no existe";            
        } 
            else{
                return byName
            }   
        } 
            else if(filter !== '') {
                    let byCont = await Country.findAll({
                        where: {
                        continents: filter
                        },
                    });
                        if(byCont.length === 0) {
                        throw "El Continente para filtrar no existe"; 
                        }    
                            else {
                                return byCont;
                            }
            }
                else{
                    let byAll = await Country.findAll();
                       /*  if(byAll.length === 0) {
                            throw "El requerimiento no pudo efectuarse"; 
                        }    
                            else { */
                                return byAll;
                        
                }
    },
}
