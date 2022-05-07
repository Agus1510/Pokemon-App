const { Router } = require("express");
const { Pokemon, Type } = require("../db.js");
const { getInfo, getName, getId } = require("../middlewares/middleware.js");

const router = Router();


router.get('/', async ( req, res) => {
    let {name, by} = req.query;
    let pokeInfo = [];
    if(name) {
        name = name.toLocaleLowerCase();
        pokeInfo = await getName(name);
        if(!pokeInfo.length) return res.json({error: 'That pokemon does not exist'})
        return res.json(pokeInfo);
    }

    pokeInfo = await getInfo(by);
    if(!pokeInfo.length) return res.json({error: 'There is not registers'});

    res.json(pokeInfo);
})


router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const pokeInfo = await getId(id);
    if(pokeInfo.id) return res.json(pokeInfo);
    return res.json({error: 'Pokemon not found'})
});

router.post('/', async (req, res) => {
    let {name, vida, fuerza, defensa, velocidad, altura, peso, tipos} = req.body;

    if(isNaN(vida) || isNaN(fuerza) || isNaN(defensa) || isNaN(velocidad) || isNaN(altura) || isNaN(peso) ) return res.json({error: 'Some argument is not a number'})

    if(!name) return res.json({error: 'Name is required'})

    const exists = await Pokemon.findOne({where : {name: name}});
    if (exists) return res.json({error : 'Pokemon already exists'})

    const pokemon = await Pokemon.create({
        name: name.toLowerCase(),
        vida: Number(vida),
        fuerza: Number(fuerza),
        defensa: Number(defensa),
        velocidad: Number(velocidad),
        altura: Number(altura),
        peso: Number(peso),
    })

    if(!tipos.length) tipos = [1];
    await pokemon.setTipos(tipos);
    res.json({info: 'Pokemon created succesfully'})
})

module.exports = router;

