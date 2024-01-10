const router = require("express").Router();
const { Card, Like } = require("../../db/models");

router.route("/").get(async (req, res) => {
  try {
    const likes = await Like.findAll({
      where: { userId: res.locals.user.id },
      include: [Card],
    });
    let cards = likes.map((like) => like.Card);
    cards = await Promise.all(
      cards.map(async (card) => {
        const { count } = await Like.findAndCountAll({
          where: { cardId: card.id },
        });
        const { count: userLikeCount } = await Like.findAndCountAll({
          where: { cardId: card.id, userId: res.locals.user.id },
        });
        return {
          ...card.dataValues,
          likesCount: count,
          isLiked: userLikeCount > 0,
        };
      })
    );
    return res.json(cards);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
module.exports = router;
