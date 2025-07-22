import User from "../models/User.js";
import bcrypt from "bcrypt";

export const handleNewUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required" });

  // check if username exists

  const duplicate = await User.findOne({ username: username });

  if (duplicate) return res.send(409);

  try {
    //encrypt password
    const hashedPwd = await bcrypt.hash(password, 10);
    // store new user
    const result = await User.create({
      username: username,
      password: hashedPwd,
    });
    console.log({ result: result });

    res.status(201).json({ message: `New user ${result.username} created` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
