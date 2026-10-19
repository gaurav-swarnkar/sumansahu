import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminToken } from '../utils/analytics';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate auth delay
    setTimeout(() => {
      const token = getAdminToken(username, password);
      
      if (token) {
        navigate('/workshop/dashboard');
      } else {
        setError('Invalid username or password');
      }
      
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-brand via-canvas to-brand/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center shadow-lg">
              <FontAwesomeIcon icon={faLock} className="text-white text-2xl" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-ink mb-2">Workshop Admin</h1>
          <p className="text-ink/60">Analytics & Insights Dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm border border-brand/10">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-ink">Username</label>
              <div className="relative">
                <FontAwesomeIcon 
                  icon={faUser} 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand/60"
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-brand/20 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-ink">Password</label>
              <div className="relative">
                <FontAwesomeIcon 
                  icon={faLock} 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand/60"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-brand/20 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-brand to-brand/90 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging in...' : 'Login to Dashboard'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-brand/10">
            <p className="text-xs text-ink/50 text-center mb-2">Demo Credentials</p>
            <div className="bg-brand/5 rounded-lg p-3 space-y-1 text-xs text-ink/70">
              <p><span className="font-semibold">Username:</span> admin</p>
              <p><span className="font-semibold">Password:</span> workshop2026</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-ink/50 text-sm mt-6">
          Admin Panel • Suman Sahu Portfolio
        </p>
      </div>
    </div>
  );
}
