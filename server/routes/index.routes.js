const router = require("express").Router();
const authRouter = require("./api/auth.routes");
const cardRouter = require("./api/card.routes");
const likeRouter = require("./api/like.routes");
const trackRouter = require("./api/track.routes");
const rejectIfNotAuthorized = require("../middlewares/rejectIfNotAuthorized");

router.use("/api/auth", authRouter);
router.use("/api/cards", cardRouter);
router.use("/api/likes", rejectIfNotAuthorized, likeRouter);
router.use("/api/tracks", rejectIfNotAuthorized, trackRouter);
module.exports = router;
