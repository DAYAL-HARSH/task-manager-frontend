import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import API from '../api/axios'

const Dashboard = () => {
  const navigate = useNavigate()
  const { user, token, logout } = useAuth()
  
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  

  const [filter, setFilter] = useState('all')


  const authHeader = {
    headers: { Authorization: `Bearer ${token}` }
  }


useEffect(() => {
  if (!token) {
    navigate('/login')
  } else {
    fetchTasks()
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

  const fetchTasks = async () => {
    try {
      const response = await API.get('/api/tasks', authHeader)
      setTasks(response.data.tasks)
    } catch (error) {
      setError('Failed to fetch tasks')
    } finally {
      setLoading(false)
    }
  }

  const createTask = async () => {
    if (!newTask.trim()) {
      setError('Task title cannot be empty')
      return
    }

    try {
      const response = await API.post('/api/tasks', {
        title: newTask,
        description: newDescription
      }, authHeader)
      

      setTasks([response.data.task, ...tasks])
      setNewTask('')
      setNewDescription('')
      setShowForm(false)
      setError('')
    } catch (error) {
      setError('Failed to create task')
    }
  }

  const toggleTask = async (task) => {
    try {
      const response = await API.put(
        `/api/tasks/${task._id}`, 
        { completed: !task.completed }, 
        authHeader
      )
      setTasks(tasks.map(t => 
        t._id === task._id ? response.data.task : t
      ))
    } catch (error) {
      setError('Failed to update task')
    }
  }

  const deleteTask = async (taskId) => {

    if (!window.confirm('Are you sure you want to delete this task?')) {
      return
    }
    
    try {
      await API.delete(`/api/tasks/${taskId}`, authHeader)
      setTasks(tasks.filter(t => t._id !== taskId))
    } catch (error) {
      setError('Failed to delete task')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }


  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-xl">Loading your tasks...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">


      <nav className="bg-white shadow-md px-10 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">TaskManager</h1>
        <div className="flex items-center space-x-4">
          <p className="text-gray-600 font-semibold">
            Hello, {user?.name}! 👋
          </p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 font-semibold"
          >
            Logout
          </button>
        </div>
      </nav>


      <div className="max-w-2xl mx-auto px-4 py-10">


        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">My Tasks</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold"
          >
            {showForm ? 'Cancel' : '+ Add Task'}
          </button>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-center">
            {error}
            <button 
              onClick={() => setError('')}
              className="ml-2 font-bold"
            >
              ✕
            </button>
          </div>
        )}


        {showForm && (
          <div className="bg-white rounded-2xl shadow p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-4">
              New Task
            </h3>
            <input
              type="text"
              placeholder="Task title (required)"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-3 focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Description (optional)"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={createTask}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700"
            >
              Create Task
            </button>
          </div>
        )}


        {tasks.length > 0 && (
          <div className="flex space-x-2 mb-6">
            {['all', 'active', 'completed'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg font-semibold capitalize ${
                  filter === f
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        )}


        {filteredTasks.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-10 text-center">
            <p className="text-gray-400 text-xl">
              {tasks.length === 0 
                ? 'No tasks yet!' 
                : `No ${filter} tasks!`
              }
            </p>
            <p className="text-gray-400 mt-2">
              {tasks.length === 0 
                ? 'Click + Add Task to get started'
                : 'Try a different filter'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div
                key={task._id}
                className={`bg-white rounded-2xl shadow p-6 flex items-center justify-between transition-all ${
                  task.completed ? 'opacity-75' : ''
                }`}
              >

                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task)}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <div>
                    <p className={`font-semibold text-lg ${
                      task.completed 
                        ? 'line-through text-gray-400' 
                        : 'text-gray-800'
                    }`}>
                      {task.title}
                    </p>
                    {task.description && (
                      <p className="text-gray-500 text-sm mt-1">
                        {task.description}
                      </p>
                    )}
                    <p className="text-gray-300 text-xs mt-1">
                      {new Date(task.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>


                <button
                  onClick={() => deleteTask(task._id)}
                  className="bg-red-100 text-red-500 px-3 py-2 rounded-lg hover:bg-red-200 font-semibold ml-4"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}


        {tasks.length > 0 && (
          <div className="mt-6 bg-white rounded-2xl shadow p-4 flex justify-around text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {tasks.length}
              </p>
              <p className="text-gray-500 text-sm">Total</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-500">
                {tasks.filter(t => !t.completed).length}
              </p>
              <p className="text-gray-500 text-sm">Active</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-500">
                {tasks.filter(t => t.completed).length}
              </p>
              <p className="text-gray-500 text-sm">Completed</p>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Dashboard