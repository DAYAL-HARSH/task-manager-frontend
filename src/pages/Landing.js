import { useNavigate } from 'react-router-dom'

const Landing = () => {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-700">
            {/* Navbar */}
            <nav className="flex justify-between items-center px-10 py-6">
                <div className="text-white text-2xl font-bold">
                    TaskManager
                </div>
                <button
                    onClick={() => navigate('/login')}
                    className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-50"
                    >
                        Login
                </button>
            </nav>

            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center text-center px-10 py-32">
                <h1 className="text-6xl font-bold text-white mb-6">
                    Organize Your Life
                </h1>
                <p className="text-xl text-blue-100 mb-10 max-w-lg">
                    Manage your tasks simply and efficiently.
                    stay productive every single day.
                </p>
                <div className="flex space-x-4">
                    <button 
                        onClick={() => navigate('/register')}
                        className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600"
                        >
                            Get Started
                    </button>
                    <button
                        onClick={() => navigate('/login')}
                        className="border-2 border-white text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600"
                    >
                        Login
                    </button>
                </div>
            </div>

            {/*Features Section */}
            <div className="flex justify-center space-x-8 px-10 pb-20">
                <div className="bg-white bg-opacity-20 rounded-2xl p-6 text-white text-center 2-56">
                    <div className="text-4xl mb-4">✓</div>
                    <h3 className="font-bold text-lg mb-2">Easy to Use</h3>
                    <p className="text-blue-100 text-sm">Simple and Clean Interface</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-2xl p-6 text-white text-center w-56">
                    <div className="text-4xl mb-4">🔒</div>
                    <h3 className="font-bold text-lg mb-2">Secure</h3>
                    <p className="text-blue-100 text-sm">Your data is always safe</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-2xl p-6 text-white text-center w-56">
                    <div className="text-4xl mb-4">⚡</div>
                    <h3 className="font-bold text-lg mb-2">Fast</h3>
                    <p className="text-blue-100 text-sm">Lightning fast performance</p>
                </div>
            </div>
        </div>
    )
}

export default Landing