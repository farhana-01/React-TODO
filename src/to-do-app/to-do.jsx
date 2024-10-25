import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  IconButton,
  Box,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);


  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const addTask = () => {
    if (newTask.trim() === '' || tasks.some((task) => task.text === newTask)) {
      return; 
    }
    const newTaskObj = { text: newTask, completed: false };
    setTasks([...tasks, newTaskObj]);
    setNewTask('');
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#ce93d8', 
        minHeight: '100vh',
        padding: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >

      <Box
        elevation={3}
        sx={{
          padding: '2rem',
          backgroundColor: '#ab47bc',
          borderRadius: '10px',
          textAlign: 'center'
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: '1rem', color: '#333' }}>
          ToDo App
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem'
          }}
        >
          <TextField
            label="Enter task"
            variant="outlined"
            value={newTask}
            onChange={handleInputChange}
            sx={{ width: '200px' }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#f50057', 
              color: 'white',
              '&:hover': { backgroundColor: '#4a148c' }
            }}
            onClick={addTask}
          >
            Add +
          </Button>
        </Box>
      </Box>

      <Box sx={{ marginTop: '2rem', width: '100%', maxWidth: '400px' }}>
        {tasks.map((task, index) => (
          <Box
            key={index}
            elevation={2}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.5rem',
              marginBottom: '0.5rem',
              backgroundColor: '#e3f2fd', 
              borderRadius: '5px'
            }}
          >
            <Typography>{task.text}</Typography>
            <IconButton
              onClick={() => removeTask(index)}
              sx={{ color: '#ff6b6b' }} 
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TodoApp;
