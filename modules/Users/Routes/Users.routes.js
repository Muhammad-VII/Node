const { getAllUsers, singUp, deleteUser, updateUser, softDelete, login } = require("../Controller/Users.controller");
const router = require("express").Router();
const validateRequest = require('../../../common/middlewares/validateRequest');
const { addUserSchema, loginSchema } = require("../Validation/user.validation");
const isAuthorized = require("../../../common/middlewares/isAuthorized");
const { GET_ALL_USERS } = require("../endpoints");

router.get("/users", isAuthorized(GET_ALL_USERS) ,getAllUsers); 
router.post("/addUser",validateRequest(addUserSchema),singUp);
router.post("/login",validateRequest(loginSchema),login);
router.put("/updateUser/:_id",updateUser)
router.delete("/deleteUser/:_id", deleteUser);
router.patch('/softDeleteUser/:_id', softDelete)

module.exports = router;