import { useState, FormEvent, KeyboardEvent, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "@/services/authService";
import Logo from "@/assets/icons/Logo";

// Background
import Background from "@/assets/Background.jpg"

/**
 * @component Login
 * @description User login page with email/password authentication.
 * Supports "Remember Me" functionality and stores authentication tokens.
 * 
 * @features
 * - Email and password validation
 * - Remember me option (localStorage vs sessionStorage)
 * - Automatic redirection on success
 * - Error handling and display
 * 
 * @navigation
 * - Success: Redirects to /home
 * - Register: Link to /register
 * - Forgot password: Link to /forgot-password
 */
const Login: React.FC = () => {
  const navigate = useNavigate();

  // State management with TypeScript types
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * @function validateEmail
   * @description Validates email format
   * @param {string} email - Email to validate
   * @returns {boolean} True if valid email format
   */
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * @function handleSubmit
   * @description Handles login form submission with validation
   * 
   * @process
   * 1. Validates email format and password
   * 2. Calls authService.login()
   * 3. Stores token in localStorage (remember me) or sessionStorage
   * 4. Stores user data (without password)
   * 5. Redirects to /home
   * 
   * @important
   * - Uses rememberMe to decide storage type (localStorage vs sessionStorage)
   * - Token and user storage now handled by authService
   * - Uses navigate with replace: true to clear history
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (isLoading) return; // Prevent multiple submissions

    setError(null);

    // Email validation
    if (!email.trim()) {
      setError("Email é obrigatório.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Por favor, insira um endereço de email válido.");
      return;
    }

    // Password validation
    if (!password.trim()) {
      setError("Senha é obrigatória.");
      return;
    }
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      setIsLoading(true);

      // authService now handles token and user storage internally
      await authService.login(email, password, rememberMe);

      // Redirect to home page
      navigate("/dashboard", { replace: true }); // replace: true clears history
    } catch (err: any) {
      // Error handling with type safety
      if (err.response) {
        setError(err.response.data?.message || "Credenciais inválidas.");
      } else if (err.request) {
        console.log(err.request)
        setError("Não foi possível conectar ao servidor. Por favor, tente novamente.");
      } else {
        setError("Ocorreu um erro inesperado.");
      }
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * @function handleKeyPress
   * @description Allows form submission with Enter key
   */
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) {
        form.requestSubmit();
      }
    }
  };

  /**
   * @function handleEmailChange
   * @description Handles email input changes and clears errors
   */
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
    if (error) setError(null); // Clear error on input change
  };

  /**
   * @function handlePasswordChange
   * @description Handles password input changes and clears errors
   */
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
    if (error) setError(null);
  };

  return (
    <main className="flex h-screen w-screen justify-center items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center z-0 opacity-10"
        style={{ backgroundImage: `url(${Background})` }}
      />
      <section className="w-full max-w-md px-6 py-8 sm:px-8 max-h-screen overflow-y-auto bg-[#141414] rounded-2xl border border-zinc-800 shadow-2xl z-10">
        {/* Logo header */}
        <header className="flex flex-col justify-center gap-2 mb-5">
          <Logo className="text-[#0E0E0E] w-10 h-10 bg-[#FDFDFD] rounded-lg p-1 shadow-md" />
        </header>

        <article className="space-y-8">
          {/* Title section */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-2xl font-semibold text-white mb-2">
              Entrar
            </h1>
            <p className="text-[#949494] text-md">
              Acesse sua conta e gerencie seus projetos e integrações.
            </p>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Error message display */}
            {error && (
              <div
                role="alert"
                className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 text-sm rounded"
              >
                {error}
              </div>
            )}

            {/* Email input */}
            <label className="block">
              <span className="sr-only">Email address</span>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                onKeyPress={handleKeyPress}
                placeholder="Endereço de email"
                aria-label="Email address"
                aria-invalid={!!error}
                autoComplete="email"
                required
                className="w-full px-0 py-3 border-0 border-b border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors bg-transparent"
                disabled={isLoading}
              />
            </label>

            {/* Password input */}
            <label className="block">
              <span className="sr-only">Password</span>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                onKeyPress={handleKeyPress}
                placeholder="Senha"
                aria-label="Password"
                aria-invalid={!!error}
                autoComplete="current-password"
                required
                minLength={6}
                className="w-full px-0 py-3 border-0 border-b border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors bg-transparent"
                disabled={isLoading}
              />
            </label>

            {/* Remember me checkbox and forgot password link */}
            <nav className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setRememberMe(e.target.checked)
                  }
                  aria-label="Remember me"
                  className="w-4 h-4 border accent-zinc-900 border-gray-700 rounded-none bg-black checked:bg-white"
                  disabled={isLoading}
                />
                <span className="text-xs text-gray-400">Lembrar-me</span>
              </label>

              <Link
                to="/forgot-password"
                className="text-xs text-[#949494] hover:text-white transition-colors"
                tabIndex={isLoading ? -1 : 0}
              >
                Esqueceu sua senha?
              </Link>
            </nav>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              aria-busy={isLoading}
              className="w-full bg-white border cursor-pointer border-white text-black py-4 text-sm uppercase tracking-wider font-light hover:bg-zinc-950 hover:text-white transition-colors mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          {/* Footer with registration link */}
          <footer className="text-center pt-8 border-t border-gray-900">
            <p className="text-xs text-[#949494]">
              Não tem uma conta?{" "}
              <Link
                to="/register"
                className="text-white hover:underline hover:text-gray-200 transition"
                tabIndex={isLoading ? -1 : 0}
              >
                Cadastre-se
              </Link>
            </p>
          </footer>
        </article>
      </section>
    </main>
  );
};

/**
 * @exports Login
 * @default
 * 
 * @important
 * - Token storage depends on "remember me" checkbox
 * - User password is never stored in browser storage
 * - Navigation uses replace: true to prevent back button issues
 * - Token and user storage handled by authService
 * 
 * @dependencies
 * - react-router-dom (navigation)
 * - authService (API authentication)
 * - Logo component
 */
export default Login;