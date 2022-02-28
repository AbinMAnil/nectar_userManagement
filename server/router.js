const express = require("express");

const { getUsers, deleteUers, createUser, updateUser } = require("./controler");
const router = express.Router();

router.post("/crateUser", createUser);

router.get("/getUsers", getUsers);

router.delete("/deleteUser", deleteUers);

router.post("/updateUser", updateUser);

module.exports = router;
