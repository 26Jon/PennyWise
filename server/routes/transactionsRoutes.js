import express from 'express';
import mongoose from 'mongoose';
import Transactions from '../models/Transactions.js';
//import User from '../models/User.js';

const router = express.Router();

// //Get all transactions
// router.get('/', async(req, res) => {
//     try{
//         const allTransactions = await Transactions.find();
//         res.json(allTransactions);
//     } catch(err) {
//         return res.status(500).json({ message: err.message });
//     }
// })

// Get all transactions for a specific user by userID
router.get('/:id', async (req, res) => {
    //console.log("Received body:", req.body);

    const { id } = req.params;

    // const userExists = await User.findById(id);
    // console.log("Fetching transactions for userID:", id);
    // if (!userExists) {
    //     return res.status(404).json({ message: "User not found." });
    // }
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid user ID format." });
    }
    
    try {
        // Modify the find query to filter by userID
        const userTransactions = await Transactions.find({ userID: mongoose.Types.ObjectId(id) });
        console.log("Transactions found:", userTransactions);


        // Reactivate the check for no transactions found
        if (userTransactions.length === 0) {
            return res.status(404).json({ message: "No transactions found for this user." });
        }
        res.json(userTransactions);
    } catch (err) {
        console.error("Error fetching transactions for user:", err);
        res.status(500).json({ message: "Error fetching transactions: " + err.message });
    }
});

// Create a new transaction record
router.post('/', async (req, res) => {
    const { userID, recAmount, recDate, categoryID, recDesc, recPicture, paymentID } = req.body;

    if (!userID || !recAmount || !recDate || !categoryID || !paymentID) {
        return res.status(400).json({ message: "All required fields must be filled." });
    }

    const newTransaction = new Transactions({
        userID: mongoose.Types.ObjectId(userID),
        recAmount,
        recDate: new Date(recDate),
        categoryID: mongoose.Types.ObjectId(categoryID),
        recDesc,
        recPicture,
        paymentID: mongoose.Types.ObjectId(paymentID)
    });

    try {
        const savedTransaction = await newTransaction.save();
        res.status(201).json(savedTransaction);
    } catch (err) {
        console.error("Error creating transaction:", err);
        res.status(500).json({ message: "Error creating transaction: " + err.message });
    }
});

// Update a transaction record by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid transaction ID format." });
    }

    try {
        const updatedTransaction = await Transactions.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedTransaction) {
            return res.status(404).json({ message: "Transaction not found." });
        }
        res.json(updatedTransaction);
    } catch (err) {
        console.error("Error updating transaction:", err);
        res.status(500).json({ message: "Error updating transaction: " + err.message });
    }
});

// Delete a transaction record by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid transaction ID format." });
    }

    try {
        const deletedTransaction = await Transactions.findByIdAndDelete(id);
        if (!deletedTransaction) {
            return res.status(404).json({ message: "Transaction not found." });
        }
        res.json({ message: "Transaction deleted successfully." });
    } catch (err) {
        console.error("Error deleting transaction:", err);
        res.status(500).json({ message: "Error deleting transaction: " + err.message });
    }
});

export default router;
