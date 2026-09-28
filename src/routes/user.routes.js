import { Router } from "express";
import { logoutUser, registerUser , loginUser, refreshAccessToken, changePassword, getCurrentUser, updateAccountDetails, updateAvatarUser, updateCoverImageUser, getUserChannelProfile, getWatchHistory } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register").post(
    upload.fields([
      {
        name:"avatar",
        maxCount:1

      },
      {
        name : "coverImage",
        maxCount:1
      }
    ]),
    registerUser
)
router.route("/login").post(loginUser);
//protected routes
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/refreshToken").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT , changePassword);
router.route("/currentUser").get(verifyJWT , getCurrentUser);
router.route("/update-account").patch(verifyJWT , updateAccountDetails);
router.route("/update-avatar").patch(verifyJWT , upload.single("avatar") , updateAvatarUser);
router.route("/update-coverImage").patch(verifyJWT , upload.single("coverImage"), updateCoverImageUser);
router.route("/c/:username").get(verifyJWT , getUserChannelProfile);
router.route("/history").get(verifyJWT , getWatchHistory);

export default router;