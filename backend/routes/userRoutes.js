const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const {
  validateUserCredentials,
} = require("../middlewares/userAuthMiddleware");

router.post("/signup", userController.userSignup);
router.post("/login", userController.userLogin);

router.use(validateUserCredentials);

router.get("/courses", userController.getUserCourses);
router.post("/courses/:courseId", userController.purchaseCourse);
router.get("/purchasedCourses", userController.getPurchasedCourses);

module.exports = router;
