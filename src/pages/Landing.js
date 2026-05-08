import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen overflow-hidden selection:bg-cyan-500/30">
            <div className="absolute inset-0 bg-[#020617] -z-10" />
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px]" />

            <nav className="sticky top-0 z-50 flex justify-between items-center px-6 md:px-16 py-5 backdrop-blur-md border-b border-white/5">
                <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded bg-gradient-to-tr from-cyan-400 to-blue-600 shadow-lg shadow-blue-500/20" />
                    <span className="text-white text-xl font-black tracking-tighter uppercase italic">
                        Task<span className="text-cyan-400">ly</span>
                    </span>
                </div>
                <div className="flex items-center gap-6">
                    <button 
                        onClick={() => navigate('/login')}
                        className="text-slate-400 text-sm font-semibold hover:text-white transition-colors"
                    >
                        Login
                    </button>
                    <button
                        onClick={() => navigate('/register')}
                        className="bg-white text-slate-950 px-6 py-2 rounded-lg font-bold text-sm hover:bg-cyan-400 transition-all active:scale-95 shadow-md shadow-white/5"
                    >
                        Sign Up
                    </button>
                </div>
            </nav>

            <div className="relative flex flex-col items-center justify-center text-center px-6 pt-32 pb-20">
                <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tight max-w-5xl leading-none">
                    Keep your life <br/>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-500">
                        on track.
                    </span>
                </h1>
                
                <p className="text-lg md:text-2xl text-slate-400 mb-12 max-w-2xl font-light leading-relaxed">
                    A simple place to write down your tasks, set your goals, and actually get things done without any of the extra clutter.
                </p>

                <div className="flex flex-col sm:flex-row gap-5">
                    <button 
                        onClick={() => navigate('/register')}
                        className="px-10 py-5 rounded-xl bg-white text-slate-950 font-bold text-lg shadow-2xl shadow-cyan-500/10 hover:bg-cyan-400 hover:-translate-y-1 active:translate-y-0 transition-all"
                    >
                        Start Now
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-16 pb-32 max-w-7xl mx-auto">
                <FeatureCard 
                    icon="📝" 
                    title="Easy to Use" 
                    desc="Just type your task and save it. No confusing menus or complicated setups."
                />
                <FeatureCard 
                    icon="🔒" 
                    title="Private" 
                    desc="Your account is protected, so your personal to-do list stays only with you."
                />
                <FeatureCard 
                    icon="⚡" 
                    title="Very Fast" 
                    desc="Built to be lightweight so you can check and add tasks in seconds."
                />
            </div>
        </div>
    );
}

const FeatureCard = ({ icon, title, desc }) => (
    <div className="group p-10 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all duration-500">
        <div className="text-3xl mb-6">
            {icon}
        </div>
        <h3 className="font-bold text-xl text-white mb-4 tracking-tight">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-400 transition-colors">{desc}</p>
    </div>
);

export default Landing;