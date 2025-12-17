import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Package, AlertCircle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
          },
        });
        if (error) throw error;
        toast({
          title: "Cuenta creada",
          description: "Revisa tu correo para confirmar tu cuenta.",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate("/");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Ha ocurrido un error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Section - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center bg-gradient-to-b from-amber-50 to-white border-r border-gray-100">
        <div className="text-center space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">
              <span className="text-amber-800">Behiqué</span>{" "}
              <span className="text-emerald-600">Express</span>
            </h1>
            <p className="text-gray-500 text-sm">Sistema de Gestión Logística</p>
          </div>
          
          <div className="flex justify-center">
            <div className="w-32 h-32 rounded-full bg-amber-100 flex items-center justify-center">
              <Package className="w-16 h-16 text-amber-700" />
            </div>
          </div>
          
          <p className="text-gray-400 text-xs max-w-xs mx-auto">
            Soluciones integrales para el envío y seguimiento de paquetes
          </p>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-3xl font-bold">
              <span className="text-amber-800">Behiqué</span>{" "}
              <span className="text-emerald-600">Express</span>
            </h1>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-800">
              Introduzca sus credenciales
            </h2>
            <p className="text-sm text-gray-500">
              {isSignUp ? "Crear una nueva cuenta" : "Acceda a su cuenta"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="usuario@ejemplo.com"
                  required
                  className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 focus:border-emerald-500 focus:ring-0 bg-transparent text-gray-800 placeholder-gray-400 transition-colors outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 focus:border-emerald-500 focus:ring-0 bg-transparent text-gray-800 placeholder-gray-400 transition-colors outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Procesando..." : isSignUp ? "REGISTRARSE" : "ENTRAR"}
            </button>
          </form>

          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              {isSignUp
                ? "¿Ya tienes cuenta? Iniciar sesión"
                : "¿No tienes cuenta? Registrarse"}
            </button>

            <div className="space-y-2 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-red-500 text-xs">
                <Info className="w-4 h-4" />
                <span>Tips sobre el uso del sistema.</span>
              </div>
              <div className="flex items-center gap-2 text-red-500 text-xs">
                <AlertCircle className="w-4 h-4" />
                <span>CONDICIONES DE USO.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
