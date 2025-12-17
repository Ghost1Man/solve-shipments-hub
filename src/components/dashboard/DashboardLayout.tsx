import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import Header from './Header';
import SubMenu from './SubMenu';
import Workspace from './Workspace';

const COMPANIES = ['AeroVaradero', 'Emci'];

const MENU_ITEMS = [
  'AeroVaradero',
  'Emci',
  'Entregas',
  'Facturación',
  'Nomencladores',
  'Herramientas',
  'Usuarios',
];

const DashboardLayout = () => {
  const [activeMenu, setActiveMenu] = useState('Entregas');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
        if (!session?.user) {
          navigate('/auth');
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (!session?.user) {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-workspace">
        <div className="text-gray-500">Cargando...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        companies={COMPANIES}
        menuItems={MENU_ITEMS}
        activeMenu={activeMenu}
        onMenuChange={setActiveMenu}
        username="CUBAE"
      />
      
      {/* Spacer for fixed header */}
      <div className="h-14" />
      
      {/* SubMenu */}
      <SubMenu activeMenu={activeMenu} />
      
      {/* Main Workspace */}
      <Workspace />
    </div>
  );
};

export default DashboardLayout;
