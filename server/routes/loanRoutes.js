import express from 'express';
import mongoose from 'mongoose';
import Loan from '../models/Loan.js';

const router = express.Router();

//Get all loans or filter loans
// router.get('/loan', async (req, res) => {
//     const { loanType, loanStatus } = req.query;
//     const filter = {};

//     if(loanType) filter.loanType = loanType;
//     if (loanStatus) filter.loanStatus = loanStatus;

//     try{
//         const loans = await Loan.find(filter);
//         res.json(loans);
//     } catch (err) {
//         res.status(500).json({ message: err.message })
//     }
// });

//Get all loans
router.get('/', async(req, res) => {
    
    try{
        const allLoans = await Loan.find();
        console.log(allLoans);
        res.json(allLoans);
    } catch(err){
        res.status(500).json({ message: err.message });
    }
});

//Get all loans based on userID
router.get('/:uid', async(req, res) => {
    const { uid } = req.params;
    console.log("Fetching user id: ",uid);

    try{
        const userLoans = await Loan.find({ userID: mongoose.Types.ObjectId(uid) })
        console.log(userLoans);

        res.json(userLoans);
    }catch(err){
        console.log("Error fetching loans for user: ", err.message);
        res.status(500).json({ message: err.message });
    }
})

//Create a new loan
router.post('/', async (req, res) => {
    const {userID, loanAmount, loanDate, loanPerson, loanType, loanDesc, loanStatus } = req.body;

    const newLoan = new Loan({
        userID,
        loanAmount,
        loanDate,
        loanPerson,
        loanType,
        loanDesc,
        loanStatus,
    });

    try{
        const savedLoan = await newLoan.save();
        res.status(201).json(savedLoan);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

//Update a loan by ID
router.put('/:id', async (req, res) => {
    try{
        const updatedLoan = await Loan.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if(!updatedLoan) return res.status(404).json({ message: 'Loan not found' });
        res.json(updatedLoan);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


//Delete loan
router.delete('/:id', async (req, res) => {
    try{
        const deletedLoan = await Loan.findByIdAndDelete(req.params.id);
        if(!deletedLoan) return res.status(404).json({ message: 'Loan not found' });
        res.json({ message: 'Loan deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;

