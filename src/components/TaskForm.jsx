import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Menu, MenuItem, Checkbox,
  TablePagination, Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NewTaskForm from './NewTaskForm';  // Import the new task form component

const TaskForm = ({ onEdit, onDelete }) => {
  const [tasks, setTasks] = useState([
    {
      "assignedTo": "User 1",
      "status": "Not Started",
      "dueDate": "2024-10-01",
      "priority": "Normal",
      "comments": "Initial task"
    },
    {
      "assignedTo": "User 2",
      "status": "In Progress",
      "dueDate": "2024-10-05",
      "priority": "High",
      "comments": "Important task"
    },
    {
      "assignedTo": "User 3",
      "status": "Completed",
      "dueDate": "2024-09-25",
      "priority": "Low",
      "comments": "Completed earlier"
    },
    {
      "assignedTo": "User 4",
      "status": "Not Started",
      "dueDate": "2024-11-10",
      "priority": "Normal",
      "comments": "Future task"
    },
    {
      "assignedTo": "User 5",
      "status": "On Hold",
      "dueDate": "2024-10-15",
      "priority": "Medium",
      "comments": "Waiting for approval"
    },
    {
      "assignedTo": "User 6",
      "status": "In Progress",
      "dueDate": "2024-09-30",
      "priority": "High",
      "comments": "Deadline approaching"
    },
    {
      "assignedTo": "User 7",
      "status": "Not Started",
      "dueDate": "2024-10-20",
      "priority": "Normal",
      "comments": "New task assigned"
    },
    {
      "assignedTo": "User 8",
      "status": "Completed",
      "dueDate": "2024-09-22",
      "priority": "Low",
      "comments": "No issues"
    },
    {
      "assignedTo": "User 9",
      "status": "On Hold",
      "dueDate": "2024-10-12",
      "priority": "Medium",
      "comments": "Pending review"
    },
    {
      "assignedTo": "User 10",
      "status": "In Progress",
      "dueDate": "2024-10-02",
      "priority": "High",
      "comments": "Critical task"
    }
  ]
  );

  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // State for adding, editing, and deleting tasks
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [isDeletingTask, setIsDeletingTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Handle opening the new task modal
  const handleNewTask = () => {
    setIsAddingTask(true);
  };

  // Handle saving a new task
  const handleSaveTask = (newTask) => {
    setTasks([...tasks, newTask]);
    setIsAddingTask(false);
  };

  // Handle opening the edit dialog
  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsEditingTask(true);
    handleCloseMenu();
  };

  // Handle saving the edited task
  const handleSaveEdit = () => {
    if (selectedTask) {
        setTasks(tasks.map(task => (task === selectedTask ? { ...task, ...selectedTask } : task)));
        setIsEditingTask(false);
        setSelectedTask(null);
    }
};

  // Handle opening the delete confirmation dialog
  const handleDeleteDialog = (task) => {
    setSelectedTask(task);
    setIsDeletingTask(true);
    handleCloseMenu();
  };

  // Handle confirming deletion of a task
  const handleConfirmDelete = () => {
    setTasks(tasks.filter(task => task !== selectedTask));
    setIsDeletingTask(false);
    setSelectedTask(null);
  };

  // Handle canceling dialogs
  const handleCancel = () => {
    setIsAddingTask(false);
    setIsEditingTask(false);
    setIsDeletingTask(false);
    setSelectedTask(null);
  };

  // Handle menu actions
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Paginated tasks
  const paginatedTasks = tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper elevation={3}>
      <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Tasks</h2>
          <p>All Tasks</p>
        </div>
        <div>
          <Button variant="contained" color="primary" style={{ marginRight: '8px' }} onClick={handleNewTask}>
            New Task
          </Button>
          <Button variant="contained" color="secondary">Refresh</Button>
        </div>
      </div>

      {/* New Task Modal */}
      <Dialog open={isAddingTask} onClose={handleCancel} fullWidth maxWidth="sm">
        <DialogTitle>New Task</DialogTitle>
        <DialogContent>
          <NewTaskForm onSave={handleSaveTask} onCancel={handleCancel} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Task Modal */}
      <Dialog open={isEditingTask} onClose={handleCancel} fullWidth maxWidth="sm">
    <DialogTitle>Edit Task</DialogTitle>
    <DialogContent>
        <TextField
            label="Assigned To"
            value={selectedTask?.assignedTo || ''}
            onChange={(e) => setSelectedTask({ ...selectedTask, assignedTo: e.target.value })}
            fullWidth
        />
        {/* Add additional fields for status, due date, priority, comments */}
    </DialogContent>
    <DialogActions>
        <Button onClick={handleSaveEdit} color="primary">Save</Button> {/* Call the function here */}
        <Button onClick={handleCancel} color="secondary">Cancel</Button>
    </DialogActions>
</Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeletingTask} onClose={handleCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this task?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDelete} color="primary">Delete</Button>
          <Button onClick={handleCancel} color="secondary">Cancel</Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Comments</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTasks.map((task, index) => (
              <TableRow key={index}>
                <TableCell><Checkbox /></TableCell>
                <TableCell>{task.assignedTo}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>{task.comments}</TableCell>
                <TableCell>
                  <IconButton onClick={handleClick}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleCloseMenu}
                  >
                    <MenuItem onClick={() => handleEdit(task)}>Edit</MenuItem>
                    <MenuItem onClick={() => handleDeleteDialog(task)}>Delete</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <TablePagination
        component="div"
        count={tasks.length}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
        labelRowsPerPage="Rows per page"
      />
    </Paper>
  );
};

export default TaskForm;
