const router = require("express").Router();
const {
  models: { User, Order, OrderAlbum, Album },
} = require("../db");
module.exports = router;

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "email", "address", "isAdmin"],
    });
    res.send(users);
  } catch (err) {
    next(err);
  }
});

router.post("/", requireToken, async (req, res, next) => {
  try {
    const user = req.body;
    const newUser = await User.create(user);
    res.json(newUser);
  } catch (err) {
    next(err);
  }
});

router.put("/", requireToken, async (req, res, next) => {
  try {
    const updates = req.body;
    const user = await User.findByPk(updates.id);

    if (user === null) {
      const err = new Error();
      err.status = 404;
      throw err;
    }
  
    Object.entries(updates).forEach(([key, value]) => {
      user[key] = value;
    });

    await user.save();

    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", requireToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (user === null) {
      const err = new Error();
      err.status = 404;
      throw err;
    }

    await user.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

router.get("/:id", requireToken, async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/cart", requireToken, async (req, res, next) => {
  try {
    const [cart] = await Order.findAll({
      attributes: ["id", "billingInfo", "shippingInfo", "completed"],
      where: {
        userId: req.params.id,
        completed: false,
      },
    });

    if (!cart) res.status(404).send({});

    const items = await OrderAlbum.findAll({
      attributes: ["id", "price", "quantity"],
      where: {
        orderId: cart.id,
      },
      include: {
        model: Album,
        attributes: ["id", "price", "title", "artistName", "image"],
      },
    });

    res.json({ ...cart.dataValues, items });
  } catch (err) {
    next(err);
  }
});
