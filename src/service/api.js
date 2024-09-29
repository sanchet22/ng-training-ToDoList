import axios from 'axios';

const url = "http://127.0.0.1:3003/task";

export const getallTasks = async (id) => {
    id = id || '';
    return await axios.get(`${url}/${id}`);
};

export const addTask = async (task) => {
    return await axios.post(url, task);
};

export const editTask = async (id, task) => {
    return await axios.put(`${url}/${id}`, task);
};

export const deleteTask = async (id) => {
    return await axios.delete(`${url}/${id}`);
};
