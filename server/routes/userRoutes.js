import express from 'express';
import User from '../models/User.js';

const router = express.Router();

//Get user by ID
router.get('/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

//Update user
router.put('/:id', async (req, res) => {
    try{
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Delete user
router.delete('/:id', async (req, res) => {
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;