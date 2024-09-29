import React, { useEffect, useState } from 'react';
import { Container, Typography, FormControl, InputLabel, Input, Box, FormGroup, Button } from '@mui/material';
import { editTask, getallTasks } from '../service/api';
import { useNavigate, useParams } from 'react-router-dom';

const initialValue = {
    assignedTo: "",
    status: "",
    dueDate: "",
    priority: "",
    comments: ""
};

const EditTask = () => {
    const [task, setTask] = useState(initialValue);
    const { assignedTo, status, dueDate, priority, comments } = task;
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        loadTaskData();
    }, []);

    const loadTaskData = async () => {
        const response = await getallTasks(id); // Make sure this API returns Task details correctly
        setTask(response.data);
    };

    const onValueChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const editTaskDetails = async () => {
        await editTask(id, task);
        navigate('/all'); // Navigate back to the Task list after editing
    };

    return (
        <Container maxWidth="sm">
            <Box my={5}>
                <Typography variant="h5" align="center">Update Task Details</Typography>
                <FormGroup>
                    <FormControl>
                        <InputLabel>Assigned To</InputLabel>
                        <Input onChange={onValueChange} name="assignedTo" value={assignedTo} />
                    </FormControl>
                    <FormControl>
                        <InputLabel>Status</InputLabel>
                        <Input onChange={onValueChange} name="status" value={status} />
                    </FormControl>
                    <FormControl>
                        <InputLabel>Due Date</InputLabel>
                        <Input type="date" onChange={onValueChange} name="dueDate" value={dueDate} />
                    </FormControl>
                    <FormControl>
                        <InputLabel>Priority</InputLabel>
                        <Input onChange={onValueChange} name="priority" value={priority} />
                    </FormControl>
                    <FormControl>
                        <InputLabel>Comments</InputLabel>
                        <Input onChange={onValueChange} name="comments" value={comments} />
                    </FormControl>
                    <Box my={3}>
                        <Button variant="contained" onClick={editTaskDetails} color="primary" align="center">Update Task</Button>
                        <Button onClick={() => navigate("/all")} variant="contained" color="secondary" align="center" style={{ margin: '0px 20px' }}>Cancel</Button>
                    </Box>
                </FormGroup>
            </Box>
        </Container>
    );
}

export default EditTask;
