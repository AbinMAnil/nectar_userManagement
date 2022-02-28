const user = require("./model");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const createToken = ({ userName, password }) =>
  sign({ username: userName, password: password }, "jwtAdminSecrect");

module.exports = {
  // for get all users.
  getUsers: async (req, res) => {
    try {
      const data = await user.find();
      res.status(200).json({ data });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // for delete user
  deleteUers: async (req, res) => {
    const { id } = req.body;

    try {
      const result = await user.findById(id);
      console.log(result);
      if (result == null) {
        res
          .status(400)
          .json({ message: "User not found please  check   the id " });
        return;
      }
    } catch (err) {
      res.status(400).json({
        error_name: err.name,
        eroor_stack: err.stack,
        errro_message: err.message,
      });
      return;
    }

    try {
      const { deletedCount } = await user.deleteOne({ _id: objectId(id) });
      if (deletedCount) {
        res.status(200).json({ message: "user deleted successfully " });
      } else {
        res.status(400).json({ message: "sorry somthing went wrong !" });
      }
    } catch (err) {
      res.status(400).json({
        error_name: err.name,
        eroor_stack: err.stack,
        errro_message: err.message,
      });
    }
  },

  // for create user
  createUser: async (req, res) => {
    const { userName } = req.body;
    console.log(userName);

    const exitsUser = await user.findOne({ userName: userName });

    if (exitsUser != null) {
      res.status(401).json({
        registerStatus: false,
        message: "The name is already taken ....",
      });
      return;
    }
    try {
      const result = await user({ userName: userName }).save();
      res
        .status(200)
        .json({ createStatus: true, username: userName, _id: result._id });
    } catch (err) {
      res.status(404).json({ registerStatus: false, message: err.message });
    }
  },

  // for update users
  updateUser: async (req, res) => {
    console.log(req.body);
    const { id, newUserName } = req.body;
    try {
      const result = await user.updateOne(
        { _id: objectId(id) },
        {
          $set: {
            userName: newUserName,
          },
        }
      );
      console.log(result);
      res.status(200).json({ message: "User name updated succesfully" });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },
};
