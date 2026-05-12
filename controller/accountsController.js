const AccountsModel = require('../models/accountsModel')
const bcrypt = require('bcrypt')  

// register
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body

        let user = await AccountsModel.findOne({ email }) 
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        user = await AccountsModel.findOne({username})
        if(user){
            return res.status(400).json({
                success: false,
                message: "Username already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        

        const account = await AccountsModel.create({
            username, email, password: hashedPassword
        })

        if(!account) return res.status(400).json({
            success: false,
            message: "Invalid user data"
        })

        res.status(201).json({
            success: true,
            account
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// retrieve all users
exports.getAllUsers = async (req, res) => {
    try {
        const accounts = await AccountsModel.find()
        res.status(200).json({
            success: true,
            accounts
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// retrieve account details
exports.getAccountDetails = async (req, res) => {
    try {
        const { id } = req.params

        const account = await AccountsModel.findById(id)
        
        if (!account) {
            return res.status(404).json({
                success: false,
                message: "Account not found"
            })
        }

        res.status(200).json({
            success: true,
            account
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}   

// update account details
// update account details
exports.updateAccountDetails = async (req, res) => {
    try {
        const { id } = req.params
        const { username, email, password } = req.body

        const account = await AccountsModel.findById(id)
        
        if (!account) {
            return res.status(404).json({
                success: false,
                message: "Account not found"
            })
        }

        // Check if username is being updated and if it already exists
        if (username && username !== account.username) {
            const existingUser = await AccountsModel.findOne({ username })
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "Username already exists"
                })
            }
        }

        // Check if email is being updated and if it already exists
        if (email && email !== account.email) {
            const existingUser = await AccountsModel.findOne({ email })
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "Email already exists"
                })
            }
        }

        // Hash password if it's being updated
        let updateData = { username, email }
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10)
            updateData.password = hashedPassword
        }

        const updatedAccount = await AccountsModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        )

        res.status(200).json({
            success: true,
            account: updatedAccount
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// delete account
exports.deleteAccount = async (req, res) => {
    try {
        const { id } = req.params

        const account = await AccountsModel.findById(id)
        
        if (!account) {
            return res.status(404).json({
                success: false,
                message: "Account not found"
            })
        }

        await AccountsModel.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: "Account deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}