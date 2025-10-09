const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();
const USER_SAFE_DATA = "firstName lastName skills age gender about photoUrl";

userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", ["firstName", "lastName"]);

    res.json({
      message: "Data Fetched Successfully",
      data: connectionRequest,
    });
  } catch (err) {
    res.status(404).send("ERROR: " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequests.map((row) => {
      if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
        return row.toUserId
      }
      return row.fromUserId;
    } );

    res.json({ data });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});
module.exports = userRouter;
