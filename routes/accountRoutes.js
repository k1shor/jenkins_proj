
const express = require("express");
const { register, getAllUsers, getAccountDetails, updateAccountDetails, deleteAccount } = require("../controller/accountsController");
const router = express.Router();

router.post("/", register);
router.get("/", getAllUsers);
router.get("/:id", getAccountDetails);
router.put("/:id", updateAccountDetails);
router.delete("/:id", deleteAccount);



module.exports = router;