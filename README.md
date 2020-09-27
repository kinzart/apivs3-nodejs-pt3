npm install
//first thing to do


1- If you dont want to return id or v:
   const data = await Order.find({},'-_id -__v'); 
     // find({}, 'hereTypeWhatYouWantThatAppear name data example') 
     // find({}, 'OrWhatyouDontWant -id -name -example')

     //To hidden "_id" and "__v" use -_id -__v


2- mkdir src/repositories

3- Create a file name-repository.js
  into: 
  
  const mongoose = require('mongoose');
  const Name = mongoose.model('Name');

exports.listName = async () => {
  const res = await Name.find({}, '-_id -__v');
  return res;
};

exports.createName = async data => {
  const name = new Name(data);
  await name.save();
};

4- into name-controller.js
    lets change:
const mongoose = require('mongoose');
const repository = require('../repositories/name-repository');

// list
exports.listName = async (req, res) => {
  try {           
    const data = await repository.listName()
    res.status(200).send(data); //return and show data
  } catch (e) {
    res.status(500).send({message: 'Fail to list orders.'});
  }
};

// create
exports.createName = async (req, res) => {
  try {
    await repository.createName({
      client: req.body.client,
      address: req.body.address,
      contact: req.body.contact,
      order: req.body.order 
    });
    res.status(201).send({message: 'Order is ready!'});
  } catch (e) {
    res.status(500).send({message: 'Fail. Order is not post'});
  }
};

// NOW "name.repository.js" IS THE BUSINESS RULES

5-npm i --save express-validator

https://express-validator.github.io/docs/




6- in name-routes.js:
        add: 
const {check} = require('express-validator')


and change:

router.post('/',[
     check('address').isLength({ min: 7 }).withMessage("The (adress) need to be true, this adress is low with less letters."),
    check('order').isLength({ min: 10 }).withMessage("You need to say more about your order"),
    check('order').isLength({ max: 100 }).withMessage("Your order is very larger")
], nameController.createName);


7- change the name.controller.js 

  const { validationResult } = require('express-validator');
const repository = require('../repositories/order-repository');

// list
exports.listName = async (req, res) => {
  try {           
    const data = await repository.listName() //call method get
    res.status(200).send(data); //return and show data
  } catch (e) {
    res.status(500).send({message: 'Fail to list orders.'});
  }
};

// create
exports.createName = async (req, res) => { //call method post
  const {errors} = validationResult(req);

  if(errors.length > 0) { //errors == 1 so == true
    return res.status(400).send({message: errors})
  }

  try {
    await repository.createName({
      client: req.body.client,
      address: req.body.address,
      contact: req.body.contact,
      order: req.body.order 
    });

    res.status(201).send({message: 'Order is ready!'});
  } catch (e) {
    res.status(500).send({message: 'Oh no... Order is not post'});
  }
};





npm install
//first thing to do



1- LETS TO PUT THE "UPDATE" IN OUR BUSINESS RULES
 repositories/name-repository.js

exports.updateName = async (id, data) => {
  await Name.findByIdAndUpdate(id, {
    $set: data
  });
};

2- import function update to controller
  src/controllers/name-controller.js

  exports.updateName = async (req, res) => {
  try {
    await repository.updateName(req.params.id, req.body);
    res.status(200).send({
      message: 'Ok, was updated with successful'
    });
  } catch (e) {
    res.status(500).send({message: 'Failed to update'});
  }
};


3- In name-routes.js 
router.put('/:id', nameController.updateName);
