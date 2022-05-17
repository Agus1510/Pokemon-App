const { Router } = require("express");
const { Pokemon, Tipo } = require("../db.js");
const { info, byName, byID } = require("../middlewares/middleware.js");

const router = Router();

router.get("/", async (req, res) => {
  let { name, by } = req.query;
  let pokemonInfo = [];
  if (name) {
    name = name.toLowerCase();
    pokemonInfo = await byName(name);
    if (!pokemonInfo.length)
      return res.json({ info: "Cant find that Pokemon" });
    return res.json(pokemonInfo);
  }

  pokemonInfo = await info(by);
  if (!pokemonInfo.length) return res.json({ info: "There is no registers" });

  res.json(pokemonInfo);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const pokemonInfo = await byID(id);
  if (!pokemonInfo.id) return res.json({ info: "Cant find that pokemon" });
  res.json(pokemonInfo);
});

router.post("/", async (req, res) => {
  let { name, vida, fuerza, defensa, velocidad, altura, peso, img, tipos } =
    req.body;
  if (
    isNaN(vida) ||
    isNaN(fuerza) ||
    isNaN(defensa) ||
    isNaN(velocidad) ||
    isNaN(altura) ||
    isNaN(peso)
  )
    return res.json({ info: "Some of the arguments are not a number" });

  if (!name) return res.json({ info: "Name is required" });
  if (!img) return res.json({ info: "Image is required" });

  const existe = await Pokemon.findOne({ where: { name: name } });
  if (existe) return res.json({ info: "Pokemon already exists" });

  const pokemon = await Pokemon.create({
    name: name.toLowerCase(),
    vida: Number(vida),
    fuerza: Number(fuerza),
    defensa: Number(defensa),
    velocidad: Number(velocidad),
    altura: Number(altura),
    peso: Number(peso),
    img: img.toLowerCase(),
  });

  if (!tipos.length) tipos = [1];

  await pokemon.setTipos(tipos);
  res.json({info:"Pokemon created successfully"});
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pokemon = await Pokemon.findByPk(id);
    if (pokemon !== null) {
      await pokemon.destroy();
      res.json("Pokemon deleted correctly");
    }
  } catch (e) {
    return res.status(404).json("Error ---> " + e);
  }
});

module.exports = router;


