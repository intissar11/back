const Items = require("../models/Items");
const Restaurant = require("../models/Restaurant");

  

const addItem = async (req, res) => {
  try {
    const newItem = new Items({
      ...req.body,
      restaurant: req.user.restaurant,
    });
    // const itemExist = await Item.findOne({ title: newItem.title });
    // if (itemExist) {
    //   res.status(400).send({
    //     errors: [{ msg: "item already exists, title should be unique" }],
    //   });
    //   return;
    // }
    const result = await newItem.save();
    await Restaurant.updateOne(
      { _id: req.user.restaurant },
      { $push: { items: newItem._id } }
    );
    res.status(200).send({ msg: `item posted`, item: result });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: `can not save it ${error}` }] });
  }
};

exports.getItems = async (req, res) => {
  try {
    const result = await Item.find().populate("restaurant");
    res.status(200).send({ msg: `getting all items`, items: result });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: `can not access data ${error}` }] });
  }
};
exports.getItem = async (req, res) => {
  try {
    const result = await Item.findOne({ _id: req.params.id }).populate(
      "restaurant"
    );
    res.status(200).send({ msg: `getting the item`, item: result });
  } catch (error) {
    res.status(400).send({
      errors: [{ msg: `there is no item with this id, ${error}` }],
    });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const result = await Item.deleteOne({ _id: req.params.id });
    !result.n
      ? res.status(400).send({ errors: [{ msg: `item was already deleted` }] })
      : res.status(200).send({ msg: `item deleted`, item: result });
  } catch (error) {
    res
      .status(400)
      .send({ errors: [{ msg: `there is no item with this id, ${error}` }] });
  }
};

exports.editItem = async (req, res) => {
  try {
    const result = await Item.updateOne(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );
    result.nModified
      ? res.status(200).send({ msg: `item updated`, item: result })
      : res.status(400).send({ errors: [{ msg: `item is already updated` }] });
  } catch (error) {
    res
      .status(400)
      .send({ errors: [{ msg: `there is no item with this id, ${error}` }] });
  }
};