import React, { useState } from 'react';
import {
  Button, TextField, MenuItem, Select, FormControl, InputLabel, Paper
} from '@mui/material';

const NewTaskForm = ({ onSave, onCancel }) => {
  const [task, setTask] = useState({
    assignedTo: '',
    status: 'Not Started',
    dueDate: '',
    priority: 'Normal',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(task);  // Save the task
  };

  return (
    <Paper elevation={3} style={{ padding: '16px', maxWidth: '600px', margin: 'auto' }}>
      <h2>New Task</h2>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Assigned To</InputLabel>
          <Select
            name="assignedTo"
            value={task.assignedTo}
            onChange={handleChange}
            required
          >
            <MenuItem value="User 1">User 1</MenuItem>
            <MenuItem value="User 2">User 2</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={task.status}
            onChange={handleChange}
            required
          >
            <MenuItem value="Not Started">Not Started</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          name="dueDate"
          label="Due Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={task.dueDate}
          onChange={handleChange}
          margin="normal"
          required
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Priority</InputLabel>
          <Select
            name="priority"
            value={task.priority}
            onChange={handleChange}
            required
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Normal">Normal</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          name="description"
          label="Description"
          multiline
          rows={4}
          value={task.description}
          onChange={handleChange}
          margin="normal"
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
          <Button variant="contained" color="secondary" onClick={onCancel} style={{ marginRight: '8px' }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default NewTaskForm;
