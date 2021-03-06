import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//@DESC  Auth User and get Token
//@route POST api/users/login
//@access PUBLIC

export const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    res.status(401);
    throw new Error("Please provide email and password");
  }

  const user = await User.findOne({ email }).select("+password");

  console.log(await user.comparePassword(password));

  if (!user || !(await user.comparePassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user._id);

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token,
  });
});

//@DESC  Register a new User and get Token
//@route POST api/users
//@access PUBLIC

export const registerUser = asyncHandler(async (req, res, next) => {
  const { email, password, name } = req.body;

  // 1) Check if email and password exist
  if (!email || !password || !name) {
    res.status(401);
    throw new Error("Please provide name, email and password");
  }

  // check if user exist
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }

  // create a new User
  const user = await User.create(req.body);
  // generate token
  const token = generateToken(user._id);

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token,
  });
});

//@DESC  Get User Profile
//@route GET api/users/profile
//@access Private

export const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

//@DESC  UPDATE User Profile
//@route PATCH api/users/profile
//@access Private

export const updateUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password || user.password;
    }
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  }
});

// ADMIN ENPOINTS

//@DESC  Get Users
//@route GET api/users
//@access Private/Admin

export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({});

  if (!users) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json(users);
});

//@DESC  Delete a User
//@route DELETE api/users/:id
//@access Private/Admin

export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await user.remove();

  res.status(200).json({ message: "user removed" });
});

//@DESC  Get a User by ID
//@route GET api/users/:id
//@access Private/Admin

export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json(user);
});

//@DESC  Update a User
//@route PUT api/users/:id
//@access Private/Admin

export const updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      
    });
  }
});
