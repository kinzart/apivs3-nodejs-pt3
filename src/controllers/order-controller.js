const { validationResult } = require('express-validator');
const repository = require('../repositories/order-repository');

// list
exports.listOrder = async (req, res) => {
  try {           
    const data = await repository.listOrder() //call method get
    res.status(200).send(data); //return and show data
  } catch (e) {
    res.status(500).send({message: 'Fail to list orders.'});
  }
};

// create
exports.createOrder = async (req, res) => { //call method post
  const {errors} = validationResult(req);

  if(errors.length > 0) { //errors == 1 so == true
    return res.status(400).send({message: errors})
  }

  try {
    await repository.createOrder({
      client: req.body.client,
      address: req.body.address,
      contact: req.body.contact,
      order: req.body.order 
    });

    res.status(201).send({message: 'Your order has been placed!'});
  } catch (e) {
    res.status(500).send({message: 'Your order was canceled or something went wrong'});
  }
};

// Update
exports.updateOrder = async (req, res) => {
  const {errors} = validationResult(req);

  if(errors.length > 0) {
    return res.status(400).send({message: errors})
  }

  try {
    await repository.updateOrder(req.params.id, req.body);
    res.status(200).send({
      message: 'Ok, was updated with successful'
    });
  } catch (e) {
    res.status(500).send({message: 'Failed to update'});
  }
};
