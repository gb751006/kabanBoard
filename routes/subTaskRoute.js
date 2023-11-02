const express = require('express');
const subTaskRouter = express.Router();
const Subtask = require('../models/subtask');


subTaskRouter.post('/add', async (req, res) => {
  try {

    const { title, isCompleted } = req.body;


    const newSubtask = new Subtask({ title, isCompleted });

 
    await newSubtask.save();

   
    res.status(201).json(newSubtask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create a new subtask' });
  }
});


subTaskRouter.get('/', async (req, res) => {
  try {
   
    const subtasks = await Subtask.find();

 
    res.json(subtasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve subtasks' });
  }
});

subTaskRouter.get('/:id', async (req, res) => {
  try {
   
    const subtask = await Subtask.findById(req.params.id);

  
    if (!subtask) {
      return res.status(404).json({ error: 'Subtask not found' });
    }

   
    res.json(subtask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve the subtask' });
  }
});


subTaskRouter.patch('/update/:id', async (req, res) => {
  try {
   
    const updatedSubtask = await Subtask.findByIdAndUpdate(req.params.id, req.body, { new: true });

   
    if (!updatedSubtask) {
      return res.status(404).json({ error: 'Subtask not found' });
    }

   
    res.json(updatedSubtask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update the subtask' });
  }
});


subTaskRouter.delete('/delete/:id', async (req, res) => {
  try {
    
    const deletedSubtask = await Subtask.findByIdAndRemove(req.params.id);

    
    if (!deletedSubtask) {
      return res.status(404).json({ error: 'Subtask not found' });
    }

    
    res.json({ message: 'Subtask deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete the subtask' });
  }
});

module.exports = subTaskRouter;
