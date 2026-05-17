import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import API from '../api/axios'

const Dashboard = () => {
  const navigate = useNavigate()
  const { user, token, logout, authLoading } = useAuth()

  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState('all')
  const [stats, setStats] = useState({ active: 0, completed: 0 })
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalTasks, setTotalTasks] = useState(0)
  const [aiLoading, setAiLoading] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const limit = 5

  const fetchTasks = useCallback(async (page = 1, status = 'all') => {
    try {
      setLoading(true)
      const statusParam = status === 'all' ? '' : `&status=${status}`
      const response = await API.get(
        `/api/tasks?page=${page}&limit=${limit}${statusParam}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setTasks(response.data.tasks)
      setCurrentPage(response.data.pagination.currentPage)
      setTotalPages(response.data.pagination.totalPages)
      setTotalTasks(response.data.pagination.totalTasks)
      setStats(response.data.stats)
    } catch (err) {
      setError('Failed to fetch tasks')
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    if(authLoading) return 
    if (!token) {
      navigate('/login')
    } else {
      fetchTasks(1, filter)
    }
  }, [token, filter, fetchTasks, navigate, authLoading])

  const createTask = async () => {
    if (!newTask.trim()) return setError('Task title is required')
    try {
      await API.post(
        '/api/tasks',
        { title: newTask, description: newDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setNewTask('')
      setNewDescription('')
      setShowForm(false)
      setSuggestions([])
      setError('')
      fetchTasks(1, filter)
    } catch (err) {
      setError('Failed to create task')
    }
  }

  const toggleTask = async (task) => {
    try {
      await API.put(
        `/api/tasks/${task._id}`,
        { completed: !task.completed },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      fetchTasks(currentPage, filter)
    } catch (err) {
      setError('Failed to update task')
    }
  }

  const deleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return
    try {
      await API.delete(
        `/api/tasks/${taskId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      fetchTasks(currentPage, filter)
    } catch (err) {
      setError('Failed to delete task')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleAISuggest = async () => {
    if (!newTask.trim()) return setError('Enter a goal first to get AI suggestions')
    try {
      setAiLoading(true)
      setError('')
      const response = await API.post(
        '/api/ai/suggest',
        { goal: newTask },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setSuggestions(response.data.suggestions)
    } catch (err) {
      setError('Failed to get AI suggestions')
    } finally {
      setAiLoading(false)
    }
  }

  const applySuggestion = (suggestion) => {
    setNewTask(suggestion)
    setSuggestions([])
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-cyan-500/30">

      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px]" />
      </div>

      <nav className="sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-white font-black">T</span>
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic text-white">
              Task<span className="text-cyan-400">ly</span>
            </span>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Workspace</span>
              <span className="text-sm font-bold text-white">{user?.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all text-[10px] font-black uppercase tracking-[0.2em]"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-black text-white tracking-tight leading-none mb-4">Focus Mode</h1>
            <p className="text-slate-500 font-medium text-lg">You have {stats.active} pending objectives today.</p>
          </div>
          <button
            onClick={() => { setShowForm(!showForm); setSuggestions([]) }}
            className="group flex items-center gap-3 bg-white text-slate-950 px-8 py-4 rounded-2xl font-black transition-all hover:bg-cyan-400 active:scale-95 shadow-xl shadow-white/5"
          >
            {showForm ? 'Close Form' : (
              <>
                <span className="text-xl group-hover:rotate-90 transition-transform">＋</span>
                New Objective
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard label="Total Tasks" value={totalTasks} color="text-blue-400" />
          <StatCard label="In Progress" value={stats.active} color="text-cyan-400" />
          <StatCard label="Completed" value={stats.completed} color="text-purple-400" />
        </div>

        {showForm && (
          <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 mb-12 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="space-y-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="What is the objective?"
                  value={newTask}
                  onChange={(e) => { setNewTask(e.target.value); setSuggestions([]) }}
                  className="flex-1 bg-white/5 border border-white/5 rounded-xl px-6 py-4 text-xl font-bold text-white placeholder-slate-700 focus:outline-none focus:border-cyan-500/50 transition-all"
                />
                <button
                  onClick={handleAISuggest}
                  disabled={aiLoading}
                  className="px-5 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {aiLoading ? '...' : '✦ AI'}
                </button>
              </div>

              {suggestions.length > 0 && (
                <div className="bg-white/5 border border-purple-500/20 rounded-2xl p-4 space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-purple-400 mb-3">
                    ✦ AI Suggestions — click to use
                  </p>
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => applySuggestion(s)}
                      className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-purple-500/10 hover:border-purple-500/30 border border-transparent text-slate-300 text-sm font-medium transition-all"
                    >
                      {i + 1}. {s}
                    </button>
                  ))}
                </div>
              )}

              <textarea
                placeholder="Add more context or details..."
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full bg-white/5 border border-white/5 rounded-xl px-6 py-4 text-slate-400 placeholder-slate-700 focus:outline-none focus:border-cyan-500/50 resize-none h-32 transition-all"
              />
              <div className="flex justify-end pt-6">
                <button
                  onClick={createTask}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-3 rounded-xl font-black uppercase text-xs tracking-widest shadow-lg shadow-blue-500/20 hover:scale-105 transition-all"
                >
                  Confirm Entry
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-8">
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
            {['all', 'active', 'completed'].map((f) => (
              <button
                key={f}
                onClick={() => { setFilter(f); setCurrentPage(1) }}
                className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                  filter === f ? 'bg-white text-slate-950 shadow-md' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          {error && <span className="text-red-400 text-xs font-bold animate-pulse">{error}</span>}
        </div>

        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="py-24 text-center border-2 border-dashed border-white/5 rounded-[40px]">
              <div className="text-4xl mb-4 opacity-20">✦</div>
              <p className="text-slate-600 font-bold uppercase tracking-[0.3em] text-xs">Clear Workspace</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className={`group flex items-center justify-between p-7 rounded-[2rem] border transition-all duration-300 ${
                  task.completed
                    ? 'bg-transparent border-white/5 opacity-40 scale-[0.98]'
                    : 'bg-white/[0.02] border-white/10 hover:border-cyan-500/30 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-8">
                  <button
                    onClick={() => toggleTask(task)}
                    className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${
                      task.completed
                        ? 'bg-cyan-500 border-cyan-500 text-slate-950'
                        : 'border-slate-800 hover:border-cyan-500/50'
                    }`}
                  >
                    {task.completed && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>

                  <div>
                    <h4 className={`font-black text-xl tracking-tight leading-tight ${task.completed ? 'text-slate-500 line-through' : 'text-white'}`}>
                      {task.title}
                    </h4>
                    {task.description && (
                      <p className="text-slate-500 text-sm mt-2 font-medium tracking-wide">{task.description}</p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => deleteTask(task._id)}
                  className="p-3 text-slate-700 hover:text-red-400 hover:bg-red-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={() => fetchTasks(currentPage - 1, filter)}
              disabled={currentPage === 1}
              className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
            >
              ← Prev
            </button>

            <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => fetchTasks(currentPage + 1, filter)}
              disabled={currentPage === totalPages}
              className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        )}

      </main>
    </div>
  )
}

const StatCard = ({ label, value, color }) => (
  <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">{label}</p>
    <p className={`text-4xl font-black tracking-tighter ${color}`}>{value}</p>
  </div>
)

export default Dashboard