const User = require("../Model/Users.model");
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
// const getAllUsers = async (req, res) => { // ** Get All Users Endpoint
//   if(res.user.role == 'admin') {
//     const results = await User.find({ isDeleted: false });
//     res.json({ message: "successfully", results });
//   } else {
//     res.status(StatusCodes.UNAUTHORIZED).json({message:'You are not allowed to view all users'})
//   }
// };

const getAllUsers = async (req,res) => {
  try {
    const results = await User.find({isDeleted: false})
    res.json({message:"successfully", results})  
  } catch (error) {
    res.json({message:"error", error})
  }
}

const singUp = async (req, res) => {
  const { name, age, email, password, role } = req.body;
  try {
    const userEmail = await User.findOne({email})
    if(userEmail) {
      res.status(StatusCodes.BAD_REQUEST).json({message:'Email already exists'})
    }
      const results = new User({ name, age, email, password, role });
      await results.save();
      res.status(StatusCodes.CREATED).json({ message: "Registerd Successfully", results });
  }
  catch ({ errors }) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "error", ...errors });
  }
};

const login = async (req,res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({email});
    if(!user) {
      res.status(StatusCodes.BAD_REQUEST).json({message:'Email is incorrect'})
    } else {
      const match = await bcrypt.compare(password, user.password);
      if(match) {
        const token = jwt.sign({ _id: user._id, role: user.role}, process.env.SECRET_KEY)
        res.status(StatusCodes.OK).json({token})
      } else {
        res.status(StatusCodes.BAD_REQUEST).json({message:'password is incorrect'})
      }
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'Internal error', error})
  }
}

const softDelete = async (req, res) => {
  const { _id } = req.params;
  try {
    const resutls = await User.updateOne({ _id }, { isDeleted: true });
    res.json({ message: "deleted successfully", resutls });
  } catch (error) {
    res.json({ message: "error", ...error });
  }
};

const deleteUser = async (req, res) => {
  const { _id } = req.params;
  try {
    const results = await User.deleteOne({ _id });
    res.json({ message: "Deleted successfully", results });
  } catch ({ errors }) {
    res.json({ message: "error", ...errors });
  }
};

const updateUser = async (req, res) => {
  const { _id } = req.params;
  const { name, password } = req.body;
  try {
    const results = await User.updateOne(
      { _id },
      { name: name, password: password }
    );
    res.json({ message: "Updated Successfully", results });
  } catch (errors) {
    res.json({ message: "error", ...errors });
  }
};

module.exports = {
  getAllUsers,
  singUp,
  login,
  softDelete,
  deleteUser,
  updateUser,
};
