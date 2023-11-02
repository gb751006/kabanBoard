const express = require('express');
const Board = require('../models/board');

const boardRouter = express.Router();


boardRouter.post('/add', async (req, res) => {
  try {
    const { name } = req.body;
    const newBoard = new Board({ name });
    await newBoard.save();
    res.status(201).json(newBoard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a new board' });
  }
});


boardRouter.get('/', async (req, res) => {
  try {
    const boards = await Board.find().populate('tasks');
    res.json(boards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve boards' });
  }
});


boardRouter.patch('/update/:id', async (req, res) => {
  try {
    const updatedBoard = await Board.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBoard) {
      return res.status(404).json({ error: 'Board not found' });
    }
    res.json(updatedBoard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update the board' });
  }
});


boardRouter.delete('/delete/:id', async (req, res) => {
  try {
    const deletedBoard = await Board.findByIdAndRemove(req.params.id);
    if (!deletedBoard) {
      return res.status(404).json({ error: 'Board not found' });
    }
    res.json({ message: 'Board deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete the board' });
  }
});

module.exports = boardRouter;
