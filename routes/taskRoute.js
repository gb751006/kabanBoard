const express = require('express');
const taskRouter = express.Router();
const Task = require('../models/task');


taskRouter.post('/add', async (req, res) => {
  try {
    
    const { title, description, status, subtask } = req.body;

    
    const newTask = new Task({ title, description, status, subtask });

    
    await newTask.save();

    
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create a new task' });
  }
});


taskRouter.get('/', async (req, res) => {
    try {
      const tasks = await Task.find().populate('subtask');
      res.json(tasks);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve tasks' });
    }
  });


taskRouter.get('/:id', async (req, res) => {
  try {
    
    const task = await Task.findById(req.params.id);

    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve the task' });
  }
});

taskRouter.patch('/update/:id', async (req, res) => {
  try {
    
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });

    
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

   
    res.json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update the task' });
  }
});


taskRouter.delete('/delete/:id', async (req, res) => {
  try {
    
    const deletedTask = await Task.findByIdAndRemove(req.params.id);

    
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete the task' });
  }
});

module.exports = taskRouter;
