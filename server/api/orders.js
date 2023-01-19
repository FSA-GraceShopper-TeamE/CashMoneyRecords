const router = require("express").Router();
const {
  models: { Order, Album, OrderAlbum, User },
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
    const orders = await Order.findAll({});
    res.send(orders);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const orderInfo = req.body;
  try {
    const order = await Order.create(orderInfo);
    res.json(order);
  } catch (err) {
    next(err);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const updates = req.body;
    const order = await Order.findByPk(updates.id);

    if (order === null) {
      const err = new Error();
      err.status = 404;
      throw err;
    }
    
    Object.entries(updates).forEach(([key, value]) => {
      order[key] = value;
    });

    await order.save();

    res.json(order);
  } catch (err) {
    next(err);
  }
});

router.get("/cart", requireToken, async (req, res, next) => {
  try {
    const [cart] = await Order.findAll({
      attributes: ["id", "billingInfo", "shippingInfo", "completed"],
      where: {
        userId: req.user.id,
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

// GET /api/orders/:orderId (Get Single Order)
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);

    if (order === null) {
      const err = new Error();
      err.status = 404;
      throw err;
    }

    const items = await OrderAlbum.findAll({
      where: {
        orderId: id,
      },
      include: [Album],
    });
    console.log("order from get order api..... ", order);
    res.json({ ...order.dataValues, items });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/orders/:orderId (Delete Single Order)
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);

    if (order === null) {
      const err = new Error();
      err.status = 404;
      throw err;
    }

    const items = await OrderAlbum.findAll({
      where: {
        orderId: id,
      },
    });

    for (const item of items) {
      await item.destroy();
    }

    await order.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

// POST /api/orders/guest (Create New Order for Guest Checkout)
router.post("/guest", async (req, res, next) => {
  try {
    const { items, shippingInfo, billingInfo } = req.body;
    const order = await Order.create({
      shippingInfo,
      billingInfo,
      completed: true,
    });

    const { id } = order;

    const orderItems = await Promise.all(
      items.map(async (item) => {
        const { price, quantity, album } = item;
        return await OrderAlbum.create({
          price,
          quantity,
          albumId: album.id,
          orderId: id,
        });
      })
    );

    res.send(order);
  } catch (err) {
    next(err);
  }
});
