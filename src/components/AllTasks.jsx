import React, { useEffect, useState } from 'react';
import {
    Table,
    TableCell,
    TableRow,
    TableHead,
    TableBody,
    TableContainer,
    Paper,
    Button,
    TablePagination,
    Typography,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Menu,
    MenuItem,
    TextField
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ArrowDropDown } from '@mui/icons-material';
import { deleteTask, getallTasks } from '../service/api';
import { Link } from 'react-router-dom';

const useStyle = makeStyles({
    table: {
        width: '80%',
        margin: '20px auto',
    },
    thead: {
        '& > *': {
            background: 'white',
            color: '#FFFFFF',
            fontSize: '16px'
        }
    },
    trow: {
        '& > *': {
            fontSize: '16px'
        }
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '20px 0',
    },
    customButton: {
        margin: '0 11px',
        padding: '6px 18px',
        backgroundColor: '#f1dc7f', 
        color: 'black',
        border: 'none',
        width:'30px',
        cursor: 'pointer',
        textDecoration: 'none', 
    },
    refreshButton: {
        padding: '10px 20px',
        backgroundColor: '#f1dc7f', 
        color: 'black',
        border: 'none',
        cursor: 'pointer',
        textDecoration: 'none', 
    },
    searchBar: {
        alignSelf: 'flex-end',
        marginTop: '10px',
        marginRight: '30px',
        width: '80%',
    },
    container: {
        backgroundColor: 'lightgray',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    }
});

const AllTasks = () => {
    const classes = useStyle();

    const [tasks, setTasks] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedActionTask, setSelectedActionTask] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = async () => {
        try {
            const response = await getallTasks(); 
            setTasks(response.data);
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
        }
    };

    const handleClickOpen = (task) => {
        setSelectedTask(task);
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const confirmDelete = async () => {
        if (selectedTask) {
            await deleteTask(selectedTask.id);
            getTasks();
            handleClose();
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Search functionality
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredTasks = tasks.filter(task =>
        task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Dropdown handlers
    const handleMenuClick = (event, task) => {
        setAnchorEl(event.currentTarget);
        setSelectedActionTask(task);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedActionTask(null);
    };

    const handleEdit = () => {
        handleMenuClose();
        // Navigate to edit page using selectedActionTask.id
    };

    const handleDelete = () => {
        handleMenuClose();
        handleClickOpen(selectedActionTask); // Open confirmation dialog
    };

    return (
        <Box className={classes.container}>
            <div className={classes.header}>
                <Typography variant="h4">Tasks<br />{`${filteredTasks.length} Records`}</Typography>
              
                <div>
                    
                    <Link to="/add" className={classes.customButton}>
                        New Task
                    </Link>
                    
                    
                    <button
                        className={`${classes.refreshButton} `}
                        onClick={() => {
                            setPage(0); // Reset the pagination to the first page if necessary
                            getTasks(); // Refresh the list by fetching the tasks again
                        }}
                    >
                        Refresh
                    </button>
                    <br />
                    <TextField
                        className={classes.searchBar}
                        label="Search"
                        variant="outlined"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        size="small"
                    />
                </div>
            </div>

            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow className={classes.thead}>
                            <TableCell>
                                <input type="checkbox" />
                            </TableCell>
                            <TableCell style={{ color: 'darkgrey' }}>Assigned To</TableCell>
                            <TableCell style={{ color: 'darkgrey' }}>Status</TableCell>
                            <TableCell style={{ color: 'darkgrey' }}>Due Date</TableCell>
                            <TableCell style={{ color: 'darkgrey' }}>Priority</TableCell>
                            <TableCell style={{ color: 'darkgrey' }}>Comments</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
                            <TableRow key={data.id} className={classes.trow}>
                                <TableCell>
                                    <input type="checkbox" />
                                </TableCell>
                                <TableCell style={{ color: 'blue' }}>{data.assignedTo}</TableCell>
                                <TableCell>{data.status}</TableCell>
                                <TableCell>{data.dueDate}</TableCell>
                                <TableCell>{data.priority}</TableCell>
                                <TableCell>{data.comments}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={(event) => handleMenuClick(event, data)}
                                    >
                                        <ArrowDropDown /> {/* Down arrow icon */}
                                    </Button>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleMenuClose}
                                    >
                                        <MenuItem
                                            variant="contained"
                                            color="primary"
                                            component={Link}
                                            to={`/edit/${data.id}`} // Link to edit page
                                        >
                                            Edit
                                        </MenuItem>
                                        <MenuItem onClick={handleDelete}>Delete</MenuItem>
                                    </Menu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredTasks.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{ backgroundColor: '#f44336', color: '#ffffff' }}>
                    {"Delete"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you want to delete the task "{selectedTask?.assignedTo}"?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose} style={{ backgroundColor: '#9e9e9e', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>
                        No
                    </button>
                    <button onClick={confirmDelete} autoFocus style={{ backgroundColor: '#ff9800', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>
                        Yes
                    </button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AllTasks;
