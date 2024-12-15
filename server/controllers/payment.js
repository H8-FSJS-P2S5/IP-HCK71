const midtransClient = require("midtrans-client");

module.exports = class PaymentController {
  static async initiateMidTrans(req, res, next) {
    try {
      const midtransClient = require("midtrans-client");

      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: "YOUR_SERVER_KEY",
      });

      const orderId = Math.random().toString();
      const amount = 10_000;

      let parameter = {
        transaction_details: {
          order_id: orderId,
          gross_amount: amount,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: req.user.email,
        },
      };

      const transaction = await snap.createTransaction(parameter);
      let transactionToken = transaction.token;

      await res.json({ message: "order created", transactionToken });
    } catch (error) {
      next(error);
    }
  }
};
