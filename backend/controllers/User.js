const User = require("../models/Register");
const bcrypt = require("bcrypt");

const saltRounds = 10;
var jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { firstname, lastname,role, email, phonenumber, address, password } =
    req.body;
  try {
    const existeUser = await User.findOne({ email });
    if (existeUser) {
      return res.status(400).json([{ msg: "user already exist" }]);
    }
    const user = await new User({
      firstname,
      lastname,
      role,
      email,
      phonenumber,
      address,
      password,
    });
    const salt = await bcrypt.genSalt(saltRounds);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const payload = {
      userID: user._id,
    };
    var token = jwt.sign(payload, process.env.SECRET);

    res.send({
      token,
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        role:user.role,
        email: user.email,
        phonenumber: user.phonenumber,
        address: user.address,
        password: user.password,
      },
    });
    
  } catch (error) {
    console.error(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json([{ msg: "you should register first" }]);
    }
    const exist = bcrypt.compare(password, user.password);
    if (!exist) {
      return res.status(400).json([{ msg: "bad Credential" }]);
    }
    const payload = {
      userID: user._id,
    };
    var token = jwt.sign(payload, process.env.SECRET);
    res.send({
      token,
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
        email: user.email,
        phonenumber: user.phonenumber,
        address: user.address,
        password: user.password,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

const getAuth = (req, res) => {
  res.send(req.user);
};

module.exports = { register, login, getAuth };

