import { IonContent, IonPage } from '@ionic/react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ViewIcon, ViewOffSlashIcon } from "hugeicons-react";
import { Alert, AlertDescription } from '../components/ui/alert';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const passwordRequirements = useMemo(() => ({
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  }), [password]);

  const allRequirementsMet = useMemo(() => 
    Object.values(passwordRequirements).every(req => req),
  [passwordRequirements]);

  const validateForm = useCallback(() => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "El correo electrónico es requerido";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "El correo electrónico no es válido";
    }

    if (!password) {
      newErrors.password = "La contraseña es requerida";
    } else if (!allRequirementsMet) {
      newErrors.password = "La contraseña no cumple con todos los requisitos";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [email, password, allRequirementsMet]);

  const handleLogin = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (validateForm()) {
      console.log('Intento de inicio de sesión con:', email, password);
      // Aquí iría la lógica real de inicio de sesión
    } else {
      console.log('El formulario contiene errores');
    }
  }, [email, password, validateForm]);

  const RequirementItem = ({ text, met }: { text: string; met: boolean }) => (
    <motion.li
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={`text-sm ${isSubmitted ? (met ? 'text-green-500' : 'text-red-500') : (met ? 'text-green-500' : 'text-gray-500')}`}
    >
      {text}
    </motion.li>
  );

  return (
    <IonPage>
      <IonContent fullscreen>
        <main className='w-full h-full flex flex-col items-center justify-center w-full max-w-[500px] px-12 mx-auto gap-6'>
          <h1 className='flex flex-row items-center gap-3 font-bold text-3xl'>
            <img src="/waving-hand-sign_1f44b.png" className="w-[30px] h-[30px]" alt="Saludo" />
            Bienvenido!
          </h1>
          <form onSubmit={handleLogin} className='flex flex-col gap-3 w-full'>
            <div>
              <Input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <Alert variant="destructive" className="mt-2">
                  <AlertDescription>{errors.email}</AlertDescription>
                </Alert>
              )}
            </div>
            <div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={errors.password ? "border-red-500" : ""}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? <ViewIcon /> : <ViewOffSlashIcon />}
                </button>
              </div>
              {errors.password && (
                <Alert variant="destructive" className="mt-2">
                  <AlertDescription>{errors.password}</AlertDescription>
                </Alert>
              )}
            </div>
            <AnimatePresence>
              {password.length > 0 && !allRequirementsMet && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-4"
                >
                  <RequirementItem text="Al menos 8 caracteres de longitud" met={passwordRequirements.length} />
                  <RequirementItem text="Contiene una letra mayúscula" met={passwordRequirements.uppercase} />
                  <RequirementItem text="Contiene una letra minúscula" met={passwordRequirements.lowercase} />
                  <RequirementItem text="Contiene un número" met={passwordRequirements.number} />
                  <RequirementItem text="Contiene un carácter especial" met={passwordRequirements.special} />
                </motion.ul>
              )}
            </AnimatePresence>
            <Button type="submit" className="w-full">Iniciar sesión</Button>
            <Button type="button" className="w-full" variant="outline">Registrarse</Button>
          </form>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Login;