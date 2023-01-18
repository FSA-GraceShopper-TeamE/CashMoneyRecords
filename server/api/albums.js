const router = require("express").Router();
const {
  models: { Album },
} = require("../db");
module.exports = router;

// GET /api/albums (Get All Albums)
router.get("/", async (req, res, next) => {
  try {
    const albums = await Album.findAll();
    res.send(albums);
  } catch (err) {
    next(err);
  }
});

router.get("/filter/:genre", async (req, res, next) => {
  try {
    const albums = await Album.findAll({where:{genre:req.params.genre}})
    res.send(albums)
  } catch(err) {
    next (err)
  }
})

// POST /api/albums (Create Album)
router.post("/", async (req, res, next) => {
  try {
    const album = req.body;
    const newAlbum = await Album.create(album);
    res.json(newAlbum);
  } catch (err) {
    next(err);
  }
});

// PUT /api/albums (Update Album)
router.put("/:id", async (req, res, next) => {
  try {
    const row = await Album.findByPk(req.params.id);
    const updatedRow = await row.update(req.body);
    
    res.send(updatedRow);
    next();
  } catch (err) {
    next (err)
  }
});

// GET /api/albums/:albumId (Get One Album)
router.get("/:id", async (req, res, next) => {
  try {
    const album = await Album.findByPk(req.params.id);
    res.send(album);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/:albumId
router.delete("/:id", async (req, res, next) => {
  try {
    const album = await Album.findOne({ where: { id: req.params.id } });
    await album.destroy();
    res.json(album);
  } catch (error) {
    next(error);
  }
});