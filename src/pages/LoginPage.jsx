import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gestione del login
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo e Titolo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <span className="text-4xl">📚</span>
              <span className="text-3xl font-bold text-white">
                BibliotecaDigitale
              </span>
            </div>
          </Link>
          <h2 className="text-2xl font-bold text-white mb-2">Bentornato!</h2>
          <p className="text-blue-200">Accedi per continuare la tua esperienza di lettura</p>
        </div>

        {/* Form di Login */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-blue-100 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-blue-200/70 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-20 outline-none transition-all"
                placeholder="Il tuo indirizzo email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-blue-100 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-blue-200/70 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-20 outline-none transition-all"
                placeholder="La tua password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-white/10 bg-white/5 text-blue-500 focus:ring-blue-400 focus:ring-opacity-20"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-blue-100">
                  Ricordami
                </label>
              </div>
              <Link to="/recupera-password" className="text-sm text-blue-300 hover:text-blue-200 transition-colors">
                Password dimenticata?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
            >
              Accedi
            </button>
          </form>

          {/* Divisore */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-blue-200 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
                oppure
              </span>
            </div>
          </div>

          {/* Social Login */}
          <div className="space-y-4">
            <button className="w-full bg-white/5 border border-white/10 text-white py-3 px-4 rounded-xl font-medium hover:bg-white/10 transition-all duration-200 flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Continua con Google</span>
            </button>
          </div>
        </div>

        {/* Link Registrazione */}
        <p className="mt-8 text-center text-sm text-blue-200">
          Non hai un account?{' '}
          <Link to="/registrati" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
            Registrati gratuitamente
          </Link>
        </p>
      </div>
    </div>
  );
}
