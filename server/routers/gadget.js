const express = require("express");
const router = express.Router();
const { GadgetController } = require("../controllers/gadgetController.js");
const openAI = require("../helpers/openai.js");
const midtransClient = require("midtrans-client");
const { User } = require("../models");
const { authentication } = require("../middlewares/authentication.js"); // Pastikan middleware ini ada

/* Open AI as foxy tech */
router.post("/foxy-tech", async (req, res) => {
  let { phone1, phone2 } = req.body;
  let resOpenAI = await openAI(phone1, phone2);
  res.send(resOpenAI);
});

/* Gateway Payment: Midtrans (success payment) */
router.patch("/subscription", authentication, async (req, res, next) => {
  try {
    await User.update(
      { isSubscribed: true },
      {
        where: {
          id: req.user.id,
        },
      }
    );
    res
      .status(200)
      .json({ message: `user with id ${req.user.id} now is a subscriber` });
  } catch (error) {
    next(error);
  }
});

/* Gateway Payment: Midtrans, to get midtrans token */
router.post("/midtrans-token", authentication, async (req, res, next) => {
  try {
    const findUser = await User.findByPk(req.user.id);
    if (findUser.isSubscribed) {
      throw { name: "already_subscribed" };
    }

    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    let parameter = {
      transaction_details: {
        order_id:
          "TRANSACTION_" + Math.floor(1000000 + Math.random() * 8000000),
        gross_amount: 1000000,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        email: findUser.email,
      },
    };

    const midtransToken = await snap.createTransaction(parameter);
    console.log(midtransToken);
    res.status(200).json(midtransToken);
  } catch (error) {
    next(error);
  }
});

router.get("/", GadgetController.showGadgetPub);
router.get("/pub/gadgets", GadgetController.showGadgetPub);
router.get("/pub/gadgets/:id", GadgetController.showOneGadgetPub);
router.get("/gadgets", GadgetController.showAllGadget);
router.get("/gadgets/:id", GadgetController.showOneGadget);

module.exports = router;
