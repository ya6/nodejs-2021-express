const uuid = require('uuid');
const database = require('../../memoryDb/memoryDb');

let { tasks } = database.memoryDb;

const getAllTasks = async (boardId) => tasks.filter(task => task.boardId === boardId);

const getTask = async (boardId, taskId) => tasks.find(task => task.id === taskId && task.boardId === boardId);

const setTask = async (boardId, taskData) => {
  const newTaskDataWithId = { ...taskData, boardId, id: uuid.v4() };
  tasks.push(newTaskDataWithId);
  return newTaskDataWithId;
};

  const updateTask = async (boardId, taskId, taskData) => {
    const index = tasks.findIndex(task => task.id === taskId);

    if (index !== -1) {
      const newTaskData = { ...taskData, id: taskId };
      tasks[index] = newTaskData;
      return newTaskData;
    }

    return -1;
  };


const deleteTask = async (boardId, taskId) => {
  if (typeof taskId !== 'string') return -1;
  const index = tasks.findIndex(task => task.id === taskId);
  if (index !== -1) {
    tasks.splice(index, 1);
  }
  return index;
};

const deleteUserFromTask = async (userId) => {
  tasks.forEach((task, idx) => {
    if (task.userId === userId) {
      tasks[idx].userId = null;
    }
  });
};

const deleteTasksFromBoard = async (boardId) => {
  if (typeof boardId !== 'string') return -1;
  try {
    tasks = tasks.filter(task => task.boardId !== boardId);
    return true;
  } catch (e) {
    process.stderr.write('Error delete all tasks from board', e);
    return false;
  }
};

module.exports = {
  getAllTasks,
  getTask,
  setTask,
  updateTask,
  deleteTask,
  deleteTasksFromBoard,
  deleteUserFromTask
};
