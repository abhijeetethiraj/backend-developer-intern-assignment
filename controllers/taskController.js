const Task = require('../models/Task')

const createTask = async(req,res)=>{

    // create Task
    try {
        const{title, description, status, priority, dueDate, assignedTo} = req.body
      const task  = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      assignedTo,
      owner: req.user._id,
      })

     res.status(201).json({message:"Task created",task})
    } catch (error) {
         res.status(500).json({message:"Server error",error:error.message})
    }
}

// Get Task

const getTasks = async (req, res) => {
  try {
    let tasks;

    if (req.user.role === "admin") {
      // Admin can see all tasks
      tasks = await Task.find().populate("owner", "name email");
    } else {
      // Normal user sees only their own tasks
      tasks = await Task.find({ owner: req.user._id });
    }

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id, // only return tasks that belong to the logged-in user
    });

    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// update the task 
const  updateTask = async(req,res)=>{
    try {
        const task = await Task.findById(req.params.id); 
        if(!task) return res.status(404).json({message:"Task not found"})
         
            if(req.user.role != "admin" && task.owner.toString() !==req.user._id.toString())
                  return res.status(403).json({ message: "Not authorized to update this task" });

      const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
      res.status(200).json({ message: "Task updated", task: updated });

    } catch (error) {
       res.status(500).json({ message: "Server error", error: error.message }); 
    }
}

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (req.user.role !== "admin" && task.owner.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized to delete this task" });

    await task.deleteOne();
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {createTask,updateTask,getTasks,deleteTask,getTaskById}