import React, { useState, useCallback, useMemo } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription } from '../components/ui/alert';
import { motion, AnimatePresence } from 'framer-motion';
import { ViewIcon, ViewOffSlashIcon } from "hugeicons-react";

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; confirmPassword?: string }>({});

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
    const newErrors: { name?: string; email?: string; password?: string; confirmPassword?: string } = {};

    if (!name.trim()) {
      newErrors.name = "El nombre es requerido";
    }

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

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [name, email, password, confirmPassword, allRequirementsMet]);

  const handleRegister = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Intento de registro con:', { name, email, password });
      // Aquí iría la lógica real de registro
    } else {
      console.log('El formulario contiene errores');
    }
  }, [name, email, password, validateForm]);

  const RequirementItem = ({ text, met }: { text: string; met: boolean }) => (
    <motion.li
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={`text-sm ${met ? 'text-green-500' : 'text-gray-500'}`}
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
            Regístrate
          </h1>
          <form onSubmit={handleRegister} className='flex flex-col gap-3 w-full'>
            <div>
              <Input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <Alert variant="destructive" className="mt-2">
                  <AlertDescription>{errors.name}</AlertDescription>
                </Alert>
              )}
            </div>
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
            <div>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirmar contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={errors.confirmPassword ? "border-red-500" : ""}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showConfirmPassword ? <ViewIcon /> : <ViewOffSlashIcon />}
                </button>
              </div>
              {errors.confirmPassword && (
                <Alert variant="destructive" className="mt-2">
                  <AlertDescription>{errors.confirmPassword}</AlertDescription>
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
            <Button type="submit" className="w-full">Registrarse</Button>
            <Button type="button" className="w-full" variant="outline" onClick={() => {/* Navegar a la página de inicio de sesión */}}>
              ¿Ya tienes una cuenta? Inicia sesión
            </Button>
          </form>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Register;