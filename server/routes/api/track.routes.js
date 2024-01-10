const router = require("express").Router();
const { Track } = require("../../db/models");

router.get("/", async (req, res) => {
  try {
    const tracks = await Track.findAll();
    res.json(tracks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
