import React, { useState } from 'react';
import {
    Container,
    Typography,
    FormControl,
    InputLabel,
    Input,
    Box,
    FormGroup,
    Button,
    Grid,
    FormHelperText
} from '@mui/material';
import { addTask } from '../service/api';
import { useNavigate } from 'react-router-dom';

const initialValue = {
    assignedTo: "",
    status: "",
    dueDate: "",
    priority: "",
    comments: ""
};

const AddTask = () => {
    const [task, setTask] = useState(initialValue);
    const [errors, setErrors] = useState({});
    const { assignedTo, status, dueDate, priority, comments } = task;

    const navigate = useNavigate();

    const onValueChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const validate = () => {
        let tempErrors = {};
        tempErrors.assignedTo = assignedTo ? "" : "Assigned To is required.";
        tempErrors.status = status ? "" : "Status is required.";
        tempErrors.dueDate = dueDate ? "" : "Due Date is required.";
        tempErrors.priority = priority ? "" : "Priority is required.";
        setErrors(tempErrors);

        // Return true if no errors
        return Object.values(tempErrors).every(x => x === "");
    };

    const addTaskDetails = async () => {
        if (validate()) {
            await addTask(task);
            navigate('/all');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box my={5} sx={{ boxShadow: 3, padding: 3, borderRadius: 2 }}>
                <Typography variant="h5" align="center" gutterBottom>Add Task Details</Typography>
                <FormGroup>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth error={Boolean(errors.assignedTo)}>
                                <InputLabel>Assigned To</InputLabel>
                                <Input onChange={onValueChange} name="assignedTo" value={assignedTo} />
                                {errors.assignedTo && <FormHelperText>{errors.assignedTo}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth error={Boolean(errors.status)}>
                                <InputLabel>Status</InputLabel>
                                <Input onChange={onValueChange} name="status" value={status} />
                                {errors.status && <FormHelperText>{errors.status}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth error={Boolean(errors.dueDate)}>
                                <InputLabel>Due Date</InputLabel>
                                <Input type="date" onChange={onValueChange} name="dueDate" value={dueDate} />
                                {errors.dueDate && <FormHelperText>{errors.dueDate}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth error={Boolean(errors.priority)}>
                                <InputLabel>Priority</InputLabel>
                                <Input onChange={onValueChange} name="priority" value={priority} />
                                {errors.priority && <FormHelperText>{errors.priority}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Comments</InputLabel>
                                <Input onChange={onValueChange} name="comments" value={comments} />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Box my={3} display="flex" justifyContent="space-between">
                        <Button variant="contained" onClick={addTaskDetails} color="primary">Add Task</Button>
                        <Button onClick={() => navigate("/all")} variant="contained" color="secondary">Cancel</Button>
                    </Box>
                </FormGroup>
            </Box>
        </Container>
    );
}

export default AddTask;
