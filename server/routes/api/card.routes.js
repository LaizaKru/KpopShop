const router = require("express").Router();
const { Card, Like } = require("../../db/models");

router
  .route("/")
  .get(async (req, res) => {
    try {
      let cards = await Card.findAll({ include: { all: true } });
      cards = await Promise.all(
        cards.map(async (card) => {
          const { count } = await Like.findAndCountAll({
            where: { cardId: card.id },
          });
          let userLikeCount = 0;
          if (res.locals.user) {
            const { count } = await Like.findAndCountAll({
              where: { cardId: card.id, userId: res.locals.user?.id },
            });
            userLikeCount = count;
          }

          return {
            ...card.dataValues,
            likesCount: count,
            isLiked: userLikeCount > 0,
          };
        })
      );
      res.json({ cards });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  .post(async (req, res) => {
    const { artist, img, price, forGame } = req.body;
    if (!artist.trim() || !img.trim() || !price) {
      return res.status(400).json({ message: "Заполните все поля" });
    }
    try {
      const card = await Card.create({ artist, img, price, forGame });
      res.json({
        success: true,
        card: { ...card.dataValues, isLiked: false, likesCount: 0 },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
router
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    try {
      const card = await Card.findOne({ where: { id } });
      if (card) {
        res.json({ success: true, card });
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    if (!res.locals.user.isAdmin) {
      return res.sendStatus(403);
    }

    try {
      const card = await Card.destroy({ where: { id } });
      if (card > 0) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  .put(async (req, res) => {
    const { artist, img, price } = req.body;
    const { id } = req.params;
    if (!artist.trim() || !img.trim() || !price) {
      return res.status(400).json({ message: "Заполните все поля" });
    }
    try {
      const card = await Card.update({ artist, img, price }, { where: { id } });
      res.json({ success: true, card });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
router.route("/:id/like").post(async (req, res) => {
  const { id } = req.params;
  const like = await Like.findOne({
    where: { cardId: id, userId: res.locals.user.id },
  });
  if (like) {
    await like.destroy();
    return res.json({ isLiked: false });
  }
  await Like.create({ cardId: id, userId: res.locals.user.id });
  return res.json({ isLiked: true });
});
router.route("/mylikes").get(async (req, res) => {
  return res.json([]);
  try {
    // const likes = await Like.findAll({
    // where: { userId: 1 },
    // include: [Card],
    // });
    // const cards = likes.map((like) => like.Card);
    return res.json([]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
module.exports = router;
