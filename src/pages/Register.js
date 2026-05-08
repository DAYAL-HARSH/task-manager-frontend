import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import API from '../api/axios'

const Register = () => {
    const navigate = useNavigate()
    const { login } = useAuth()

    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ error, setError ] = useState('')
    const [ loading, setLoading ] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        if(password.length < 6){
            setError('Password must be at least 6 characters')
            setLoading(false)
            return
        }

        try{
            const response = await API.post('/api/auth/register', {
                name,
                email,
                password 
            })

            login(response.data.user, response.data.token)
            navigate('/dashboard')
            
        } catch (error) {
            setError(error.response?.data?.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="relative min-h-screen bg-[#0f172a] flex items-center justify-center px-4 overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[100px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-600/10 blur-[100px]" />

            <div className="relative w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="flex justify-center items-center gap-2 mb-4 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="h-7 w-7 rounded bg-gradient-to-tr from-cyan-400 to-blue-600 shadow-lg shadow-blue-500/20" />
                        <span className="text-white text-xl font-black tracking-tighter uppercase italic">
                            Task<span className="text-cyan-400">ly</span>
                        </span>
                    </div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">Create Account</h1>
                    <p className="text-slate-400 mt-2 font-medium">Start managing your tasks today</p>
                </div>

                <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl mb-6 text-center text-sm animate-pulse">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-slate-300 font-semibold mb-2 ml-1 text-sm">
                                Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-slate-300 font-semibold mb-2 ml-1 text-sm">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="xyz@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-slate-300 font-semibold mb-2 ml-1 text-sm">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-500 active:scale-[0.98] transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 mt-4"
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    <div className="text-center mt-8 pt-6 border-t border-white/5">
                        <p className="text-slate-400 text-sm">
                            Already have an account?{' '}
                            <span
                                onClick={() => navigate('/login')}
                                className="text-blue-400 font-bold cursor-pointer hover:text-blue-300 transition-colors"
                            >
                                Login
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register