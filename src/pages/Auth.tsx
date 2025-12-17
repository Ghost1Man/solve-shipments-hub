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
    <div className="min-h-screen bg-white flex">
      {/* Left Section - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center border-r border-gray-200">
        <div className="text-center space-y-8">
          {/* SolveCargo Logo */}
          <h1 className="text-5xl font-light tracking-tight">
            <span className="text-gray-700">Solve</span>
            <span className="text-green-500 font-bold">D</span>
            <span className="text-gray-700">Cargo</span>
          </h1>
          
          {/* Behique Express Logo */}
          <div className="flex flex-col items-center gap-2 mt-12">
            <div className="flex items-center gap-1">
              <Package className="w-10 h-10 text-amber-600" />
            </div>
            <h2 className="text-3xl italic" style={{ fontFamily: 'Georgia, serif' }}>
              <span className="text-amber-700">Behique</span>
            </h2>
            <span className="text-amber-500 text-sm tracking-widest -mt-1">Express</span>
          </div>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-3xl font-light">
              <span className="text-gray-700">Solve</span>
              <span className="text-green-500 font-bold">D</span>
              <span className="text-gray-700">Cargo</span>
            </h1>
          </div>

          <div>
            <h2 className="text-lg font-normal text-gray-800">
              Introduzca sus credenciales
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="text-sm text-green-600">
                Usuario
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Usuario"
                required
                className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-green-500 focus:ring-0 bg-transparent text-gray-700 placeholder-gray-400 transition-colors outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-green-600">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                required
                minLength={6}
                className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-green-500 focus:ring-0 bg-transparent text-gray-700 placeholder-gray-400 transition-colors outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="py-2 px-6 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Procesando..." : "ENTRAR"}
            </button>
          </form>

          <div className="space-y-2 pt-4">
            <div className="flex items-center gap-2 text-red-500 text-sm cursor-pointer hover:underline">
              <HelpCircle className="w-5 h-5" />
              <span>Tips sobre el uso del sistema.</span>
            </div>
            <div className="flex items-center gap-2 text-red-500 text-sm cursor-pointer hover:underline">
              <AlertTriangle className="w-5 h-5" />
              <span>CONDICIONES DE USO.</span>
            </div>
            <p className="text-gray-500 text-xs mt-2">
              (Haga click sobre la notificación para ver detalles.)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
