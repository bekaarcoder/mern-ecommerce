import express from "express";
import {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  registerUser,
  updateUserProfile,
  updateUser,
} from "../controllers/userController.js";
import { protect, checkAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/").post(registerUser).get(protect, checkAdmin, getUsers);
router
  .route("/:id")
  .get(protect, checkAdmin, getUserById)
  .delete(protect, checkAdmin, deleteUser)
  .put(protect, checkAdmin, updateUser);

export default router;
