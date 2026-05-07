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
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 classsName="text-3xl font-bold text-gray-800">Create Account</h1>
                    <p className="text-gray-500 mt-2">Start managing your tasks today</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-6 text-center">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            placeholder="Vladmir Putin"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    {/* Email Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="xyz@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                {/* Login  Link */}
                <div className="text-center mt-6">
                    <p className="text-gray-500">
                        Already have an account?{' '}
                        <span
                            onClick={() => navigate('/login')}
                            className="text-blue-600 font-semibold cursor-poiter hover:underline"
                        >
                            Login
                        </span>
                    </p>
                </div>
                
            </div>
        </div>
    )
}

export default Register