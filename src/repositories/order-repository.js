const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.listOrder = async () => {
  const res = await Order.find({}, ' -__v');
  return res;
};

exports.createOrder = async data => {
  const order = new Order(data);
  await order.save();
};

exports.updateOrder = async (id, data) => {
    await Order.findByIdAndUpdate(id, {
      $set: data
    });
  };
  