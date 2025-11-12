import { useState, FormEvent, KeyboardEvent, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "@/services/authService";
import Logo from "@/assets/icons/Logo";

// Background
import Background from "@/assets/Background.jpg"

/**
 * @component Register
 * @description User registration page that allows new users to create an account.
 * Includes client-side validation, communication with the authentication service,
 * and automatic redirection to login page upon successful registration.
 *
 * @features
 * - Client-side form validation
 * - Real-time error handling
 * - Loading states during registration
 * - Keyboard navigation support (Enter key)
 *
 * @navigation
 * - Success: Redirects to /login
 * - Already registered: Link to /login
 * - Terms link: /terms
 * - Privacy link: /privacy
 */
const Register: React.FC = () => {
  const navigate = useNavigate();

  // Form field states with TypeScript types
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  
  // Company/Profile fields
  const [companyName, setCompanyName] = useState<string>("");
  const [cnpj, setCnpj] = useState<string>("");
  const [sector, setSector] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
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
   * @function validateForm
   * @description Validates all form fields before submission
   * @returns {string | null} Error message or null if valid
   */
  const validateForm = (): string | null => {
    if (!name.trim()) return "Nome é obrigatório.";
    if (!email.trim()) return "Email é obrigatório.";
    if (!validateEmail(email)) return "Por favor, insira um endereço de email válido.";
    if (!password.trim()) return "Senha é obrigatória.";
    if (password.length < 8) return "A senha deve ter pelo menos 8 caracteres.";
    if (password !== confirmPassword) return "As senhas não coincidem.";
    
    // Company fields validation
    if (!companyName.trim()) return "Nome da empresa é obrigatório.";
    if (!cnpj.trim()) return "CNPJ é obrigatório.";
    if (cnpj.replace(/\D/g, '').length !== 14) return "CNPJ deve ter 14 dígitos.";
    if (!sector.trim()) return "Setor é obrigatório.";
    if (!phone.trim()) return "Telefone é obrigatório.";
    if (!city.trim()) return "Cidade é obrigatória.";
    if (!state.trim()) return "Estado é obrigatório.";
    
    if (!acceptTerms) return "Você deve aceitar os termos e condições.";
    return null;
  };

  /**
   * @function handleSubmit
   * @description Handles registration form submission with validation and API call
   *
   * @process
   * 1. Validates all input fields (name, email format, password length, match, terms)
   * 2. Calls authService.register() with user data
   * 3. On success: redirects to login page with replace flag
   * 4. On error: displays appropriate error message
   *
   * @important
   * - Email must match regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
   * - Password minimum 8 characters
   * - Passwords must match
   * - Terms must be accepted
   * - Uses navigate replace: true to prevent back navigation
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError(null);

    if (isLoading) return; // Prevents multiple submissions

    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsLoading(true);

      // Register with complete profile data
      const data = await authService.register(
        companyName,
        cnpj,
        sector,
        name,
        email,
        password,
        confirmPassword,
        phone,
        city,
        state
      );

      console.log("User registered:", data);

      // Automatic redirection to login after registration
      navigate("/login", { replace: true });
    } catch (err: any) {
      // Error handling based on failure type
      if (err.response) {
        setError(err.response.data?.message || "Falha no registro. Por favor, tente novamente.");
      } else if (err.request) {
        setError("Não foi possível conectar ao servidor. Por favor, tente novamente.");
      } else {
        setError("Ocorreu um erro inesperado.");
      }
      console.error("Register error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * @function handleKeyPress
   * @description Allows form submission by pressing Enter key
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
   * @function handleInputChange
   * @description Generic handler for input changes that clears errors
   */
  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => (e: ChangeEvent<HTMLInputElement>): void => {
    setter(e.target.value);
    if (error) setError(null);
  };

  return (
    <main className="flex h-screen w-screen justify-center items-center overflow-hidden">
            <div
        className="absolute inset-0 bg-cover bg-center z-0 opacity-10"
        style={{ backgroundImage: `url(${Background})` }}
      />
      <section className="w-full max-w-4xl px-6 py-8 sm:px-8 max-h-screen overflow-y-auto bg-[#141414] rounded-2xl border border-zinc-800 shadow-2xl z-10">
        {/* Logo header */}
        <header className="flex flex-col justify-center gap-2 mb-5">
          <Logo className="text-[#0E0E0E] w-10 h-10 bg-[#FDFDFD] rounded-lg p-1 shadow-md" />
        </header>

        <article className="space-y-8">
          {/* Title section */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-2xl font-semibold text-white mb-2">
              Crie sua conta
            </h1>
            <p className="text-[#949494] text-md">
              Junte-se à nossa comunidade e transforme suas ideias de projetos em realidade
            </p>
          </div>

          {/* Registration form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Error message display */}
            {error && (
              <div 
                role="alert"
                className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 text-sm rounded col-span-2"
              >
                {error}
              </div>
            )}

            {/* Personal Information Section */}
            <div>
              <h3 className="text-sm font-medium text-white mb-4">Informações Pessoais</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Full name input */}
                <label className="block">
                  <span className="sr-only">Full name</span>
                  <input
                    type="text"
                    value={name}
                    onChange={handleInputChange(setName)}
                    onKeyPress={handleKeyPress}
                    placeholder="Nome completo"
                    aria-label="Full name"
                    aria-invalid={!!error}
                    autoComplete="name"
                    required
                    disabled={isLoading}
                    className="w-full px-0 py-3 border-0 border-b border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors bg-transparent"
                  />
                </label>

                {/* Email input */}
                <label className="block">
                  <span className="sr-only">Email address</span>
                  <input
                    type="email"
                    value={email}
                    onChange={handleInputChange(setEmail)}
                    onKeyPress={handleKeyPress}
                    placeholder="Endereço de email"
                    aria-label="Email address"
                    aria-invalid={!!error}
                    autoComplete="email"
                    required
                    disabled={isLoading}
                    className="w-full px-0 py-3 border-0 border-b border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors bg-transparent"
                  />
                </label>

                {/* Password input */}
                <label className="block">
                  <span className="sr-only">Password</span>
                  <input
                    type="password"
                    value={password}
                    onChange={handleInputChange(setPassword)}
                    onKeyPress={handleKeyPress}
                    placeholder="Senha (mín. 8 caracteres)"
                    aria-label="Password"
                    aria-invalid={!!error}
                    autoComplete="new-password"
                    required
                    minLength={8}
                    disabled={isLoading}
                    className="w-full px-0 py-3 border-0 border-b border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors bg-transparent"
                  />
                </label>

                {/* Confirm password input */}
                <label className="block">
                  <span className="sr-only">Confirm password</span>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={handleInputChange(setConfirmPassword)}
                    onKeyPress={handleKeyPress}
                    placeholder="Confirmar senha"
                    aria-label="Confirm password"
                    aria-invalid={!!error}
                    autoComplete="new-password"
                    required
                    minLength={8}
                    disabled={isLoading}
                    className="w-full px-0 py-3 border-0 border-b border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors bg-transparent"
                  />
                </label>
              </div>
            </div>

            {/* Company Information Section */}
            <div className="border-t border-gray-800 pt-6">
              <h3 className="text-sm font-medium text-white mb-4">Informações da Empresa</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Company name input */}
                <label className="block">
                  <span className="sr-only">Company name</span>
                  <input
                    type="text"
                    value={companyName}
                    onChange={handleInputChange(setCompanyName)}
                    onKeyPress={handleKeyPress}
                    placeholder="Nome da empresa"
                    aria-label="Company name"
                    aria-invalid={!!error}
                    autoComplete="organization"
                    required
                    disabled={isLoading}
                    className="w-full px-0 py-3 border-0 border-b border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors bg-transparent"
                  />
                </label>

                {/* CNPJ input */}
                <label className="block">
                  <span className="sr-only">CNPJ</span>
                  <input
                    type="text"
                    value={cnpj}
                    onChange={handleInputChange(setCnpj)}
                    onKeyPress={handleKeyPress}
                    placeholder="CNPJ (00.000.000/0000-00)"
                    aria-label="CNPJ"
                    aria-invalid={!!error}
                    required
                    disabled={isLoading}
                    maxLength={18}
                    className="w-full px-0 py-3 border-0 border-b border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors bg-transparent"
                  />
                </label>

                {/* Sector input */}
                <label className="block">
                  <span className="sr-only">Sector</span>
                  <input
                    type="text"
                    value={sector}
                    onChange={handleInputChange(setSector)}
                    onKeyPress={handleKeyPress}
                    placeholder="Setor (ex: Tecnologia)"
                    aria-label="Sector"
                    aria-invalid={!!error}
                    required
                    disabled={isLoading}
                    className="w-full px-0 py-3 border-0 border-b border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors bg-transparent"
                  />
                </label>

                {/* Phone input */}
                <label className="block">
                  <span className="sr-only">Phone</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={handleInputChange(setPhone)}
                    onKeyPress={handleKeyPress}
                    placeholder="Telefone (00) 00000-0000"
                    aria-label="Phone"
                    aria-invalid={!!error}
                    autoComplete="tel"
                    required
                    disabled={isLoading}
                    className="w-full px-0 py-3 border-0 border-b border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors bg-transparent"
                  />
                </label>

                {/* City input */}
                <label className="block">
                  <span className="sr-only">City</span>
                  <input
                    type="text"
                    value={city}
                    onChange={handleInputChange(setCity)}
                    onKeyPress={handleKeyPress}
                    placeholder="Cidade"
                    aria-label="City"
                    aria-invalid={!!error}
                    autoComplete="address-level2"
                    required
                    disabled={isLoading}
                    className="w-full px-0 py-3 border-0 border-b border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors bg-transparent"
                  />
                </label>

                {/* State input */}
                <label className="block">
                  <span className="sr-only">State</span>
                  <input
                    type="text"
                    value={state}
                    onChange={handleInputChange(setState)}
                    onKeyPress={handleKeyPress}
                    placeholder="Estado (ex: SP, RJ)"
                    aria-label="State"
                    aria-invalid={!!error}
                    autoComplete="address-level1"
                    required
                    disabled={isLoading}
                    maxLength={2}
                    className="w-full px-0 py-3 border-0 border-b border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors bg-transparent"
                  />
                </label>
              </div>
            </div>

            {/* Terms and conditions checkbox */}
            <label className="flex items-start gap-2 cursor-pointer pt-2">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setAcceptTerms(e.target.checked);
                  if (error) setError(null);
                }}
                aria-label="Accept terms"
                required
                disabled={isLoading}
                className="w-4 h-4 mt-0.5 border border-gray-700 accent-zinc-900 rounded-none bg-black checked:bg-white"
              />
              <span className="text-xs text-gray-400 leading-snug">
                Eu aceito os{" "}
                <Link
                  to="/terms"
                  className="text-white hover:underline hover:text-gray-200"
                  tabIndex={isLoading ? -1 : 0}
                >
                  termos e condições{" "}
                </Link>
                e a{" "}
                <Link
                  to="/privacy"
                  className="text-white hover:underline hover:text-gray-200"
                  tabIndex={isLoading ? -1 : 0}
                >
                  política de privacidade
                </Link>
              </span>
            </label>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              aria-busy={isLoading}
              className="w-full bg-white border cursor-pointer border-white text-black py-4 text-sm uppercase tracking-wider font-light hover:bg-zinc-950 hover:text-white transition-colors mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Criando conta..." : "Criar conta"}
            </button>
          </form>

          {/* Footer with login link */}
          <footer className="text-center pt-8 border-t border-gray-900">
            <p className="text-xs text-[#949494]">
              Já tem uma conta?{" "}
              <Link
                to="/login"
                className="text-white hover:underline hover:text-gray-200 transition"
                tabIndex={isLoading ? -1 : 0}
              >
                Entrar
              </Link>
            </p>
          </footer>
        </article>
      </section>
    </main>
  );
};

/**
 * @exports Register
 * @default
 *
 * @important
 * - All validations run client-side before API call
 * - Navigation uses replace: true to clear history
 * - Terms and privacy links required for legal compliance
 * - Company fields currently empty - adjust authService.register call as needed
 *
 * @dependencies
 * - react-router-dom (navigation)
 * - authService (API registration)
 * - Logo component
 */
export default Register;