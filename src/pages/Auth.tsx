import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { HelpCircle, AlertTriangle, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      navigate("/");
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
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      {/* Left Section - Branding */}
      <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100 border-r border-amber-200">
        <div className="text-center space-y-6 px-8">
          {/* Behique Express Logo */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-20 h-20 bg-amber-700 rounded-full flex items-center justify-center shadow-lg">
              <Package className="w-10 h-10 text-amber-50" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
              <span className="text-amber-800">Behiqué</span>
              <span className="text-amber-600"> Express</span>
            </h1>
            <p className="text-amber-700 text-lg tracking-wide">
              Sistema de gestión de envíos
            </p>
          </div>
          
          {/* Decorative element */}
          <div className="flex items-center gap-2 mt-8">
            <div className="h-px w-12 bg-amber-400"></div>
            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
            <div className="h-px w-12 bg-amber-400"></div>
          </div>
          
          {/* Tagline */}
          <p className="text-amber-600 text-sm max-w-xs mx-auto">
            Confianza y profesionalismo en cada entrega
          </p>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="md:hidden text-center mb-8">
            <div className="flex flex-col items-center gap-2">
              <Package className="w-12 h-12 text-amber-700" />
              <h1 className="text-2xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>
                <span className="text-amber-800">Behiqué</span>
                <span className="text-amber-600"> Express</span>
              </h1>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Bienvenido
            </h2>
            <p className="text-gray-500 text-sm">
              Introduzca sus credenciales para acceder
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-amber-700">
                Usuario
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
                required
                className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-amber-600 focus:ring-0 bg-transparent text-gray-800 placeholder-gray-400 transition-colors outline-none rounded-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-amber-700">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-amber-600 focus:ring-0 bg-transparent text-gray-800 placeholder-gray-400 transition-colors outline-none rounded-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {loading ? "Procesando..." : "ENTRAR"}
            </button>
          </form>

          <div className="space-y-3 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-red-600 text-sm cursor-pointer hover:text-red-700 transition-colors">
              <HelpCircle className="w-4 h-4" />
              <span>Tips sobre el uso del sistema.</span>
            </div>
            <div className="flex items-center gap-2 text-red-600 text-sm cursor-pointer hover:text-red-700 transition-colors">
              <AlertTriangle className="w-4 h-4" />
              <span>CONDICIONES DE USO.</span>
            </div>
            <p className="text-gray-400 text-xs mt-2">
              (Haga click sobre la notificación para ver detalles.)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
