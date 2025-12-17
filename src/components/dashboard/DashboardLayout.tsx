import { useState } from 'react';
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
