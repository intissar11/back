const { body, validationResult ,check} = require("express-validator");

const registerRules=()=>[
    body('firstname',"firstname is required").notEmpty(),
    body('lastname',"lastname is required").notEmpty(),
    body('email',"it should an Email").isEmail(),
    body('phonenumber',"phonenumber is required").notEmpty(),
    body('phonenumber',"phonenumber is Numeric").isNumeric(),
    body('address',"address is required").notEmpty(),
    body('password',"password should contain at least 8 caracteres").isLength({min:8})
]

const loginRules = () =>  [
    check('email','username or email is required').notEmpty(),
    check('password','password is required').notEmpty()
  ]

  const validator=(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
}else{
    next()
}
}

module.exports={registerRules,loginRules,validator};
