const Razorpay = require("razorpay");
const Order = require("../model/order");
const User = require("../model/user");

exports.getOrder = async (req, res) => {
  try {
    const rzp = new Razorpay({
      key_id: process.env.RZP_KEY_ID,
      key_secret: process.env.RZP_KEY_SECRET,
    });
    const order = await rzp.orders.create({ amount: 2500, currency: "INR" });
    const response = Order.create({
      orderId: order.id,
      status: "PENDING",
      userId: req.user.id,
    });
    res
      .status(201)
      .json({ orderId: order.id, keyId: "rzp_test_2vWeSPprppDfzS" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.success = async (req, res) => {
  // console.log(req.body);
  const paymentId = req.body.razorpay_payment_id;
  const orderId = req.body.razorpay_order_id;
  const order = Order.findAll({ where: { orderId: orderId } });
  const user = User.findByPk(req.user.id);
  Promise.all([order, user])
    .then((resolve) => {
      const order = resolve[0];
      const user = resolve[1];
      order[0].paymentId = paymentId;
      order[0].status = "SUCCESS";
      order[0].save();
      user.premium = true;
      user.save();
    })
    .catch((err) => {
      throw new Error(err);
    });
  res.status(202).json({ success: true, message: "Transaction Successful" });
};

exports.failed = async (req, res) => {
  const error = req.body.error;
  const orderId = error.metadata.order_id;
  const paymentId = error.metadata.payment_id;
  // console.log();
  const order = await Order.findAll({ where: { orderId: orderId } });
  order[0].paymentId = paymentId;
  order[0].status = "FAILED";
  order[0].save();
  // res.send(401).json(req.body);
};
