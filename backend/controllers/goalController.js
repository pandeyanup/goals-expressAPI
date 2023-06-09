const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalModel");
const User = require("../models/userModel");

// @desc    Get goals
// @route   GET /api/goals
// @access  Private

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

// @desc    Create goal
// @route   POST /api/goals
// @access  Private

const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please include text");
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(goal);
});

// @desc    Update goal
// @route   UPDATE /api/goals/:id
// @access  Private

const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user.id);

  // Check if user owns goal
  if (!user) {
    res.status(401);
    throw new Error("User Not authorized");
  }

  // Logged in User and Goal user are the same
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User Not authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

// @desc    Delete goal
// @route   Delete /api/goals/:id
// @access  Private

const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user.id);

  // Check if user owns goal
  if (!user) {
    res.status(401);
    throw new Error("User Not authorized");
  }

  // Logged in User and Goal user are the same
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User Not authorized");
  }

  await Goal.findByIdAndDelete(req.params.id);
  res.status(200).json({ id: req.params.id });
});

module.exports = { getGoals, setGoal, updateGoal, deleteGoal };
