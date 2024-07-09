const bcrypt = require("bcryptjs");
const User = require("../models/user");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({ error: "please provide all fields" });
  }

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) return res.status(400).send({ error: "user already exists" });

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
        name: name,
        email: email,
        password: hashedPassword
    });
    if(!newUser) return res.status(400).send({ error: "user could not be created!!" })
    
    res.send(newUser).status(201)

  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { register }