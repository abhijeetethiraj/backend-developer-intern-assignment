const express = require('express')
const router = express.Router()
const { registerUser,login} = require('../controllers/authController')
const protect = require('../middleware/authMiddleware')
const validateRegister  = require('../middleware/validate')

router.post("/register",validateRegister   ,registerUser);
router.post("/login", login);
router.get("/me", protect, (req, res) => {
  res.status(200).json({
    message: "Profile fetched successfully",
    user: req.user,
  });
});
module.exports = router