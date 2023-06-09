const exptress = require("express");
const router = exptress.Router();
const {
  getGoals,
  updateGoal,
  setGoal,
  deleteGoal,
} = require("../controllers/goalController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getGoals).post(protect, setGoal);

router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);

// router.get("/", getGoals);
// router.post("/", setGoal);
// router.put("/:id", updateGoal);
// router.delete("/:id", deleteGoal);

module.exports = router;
