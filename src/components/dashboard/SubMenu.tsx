import { 
  Package, 
  History, 
  Route, 
  GitBranch, 
  CheckCircle, 
  FileText,
  CalendarPlus,
  Ship,
  FileSpreadsheet,
  Settings,
  Users
} from 'lucide-react';
import SubMenuButton from './SubMenuButton';
import { useState } from 'react';

interface SubMenuItem {
  label: string;
  icon: typeof Package;
}

interface SubMenuConfig {
  [key: string]: SubMenuItem[];
}

const subMenuConfig: SubMenuConfig = {
  'AeroVaradero': [
    { label: 'RESERVAR', icon: CalendarPlus },
    { label: 'Guía | Buque', icon: Ship },
    { label: 'Manifiesto', icon: FileSpreadsheet },
    { label: 'Configuración', icon: Settings },
    { label: 'Corresponsal', icon: Users },
  ],
  'Emci': [
    { label: 'RESERVAR', icon: CalendarPlus },
    { label: 'Guía | Buque', icon: Ship },
    { label: 'Manifiesto', icon: FileSpreadsheet },
    { label: 'Configuración', icon: Settings },
    { label: 'Corresponsal', icon: Users },
  ],
  'Entregas': [
    { label: 'Envíos', icon: Package },
    { label: 'Histórico', icon: History },
    { label: 'Rutas', icon: Route },
    { label: 'Sub Rutas', icon: GitBranch },
    { label: 'Estado Entrega', icon: CheckCircle },
    { label: 'Estado envíos', icon: FileText },
  ],
  'Facturación': [],
  'Nomencladores': [],
  'Herramientas': [],
  'Usuarios': [],
};

interface SubMenuProps {
  activeMenu: string;
}

const SubMenu = ({ activeMenu }: SubMenuProps) => {
  const items = subMenuConfig[activeMenu] || [];
  const [activeSubItem, setActiveSubItem] = useState<string | null>(
    items.length > 0 ? items[0].label : null
  );

  // Reset active sub-item when menu changes
  if (items.length > 0 && activeSubItem && !items.find(i => i.label === activeSubItem)) {
    setActiveSubItem(items[0].label);
  }

  if (items.length === 0) {
    return (
      <div className="bg-submenu border-b border-border px-4 py-4 animate-fade-in">
        <p className="text-sm text-muted-foreground">
          No hay opciones disponibles para este módulo
        </p>
      </div>
    );
  }

  return (
    <div className="bg-submenu border-b border-border px-4 py-4 animate-slide-down">
      <div className="flex items-center gap-3 flex-wrap">
        {items.map((item) => (
          <SubMenuButton
            key={item.label}
            label={item.label}
            icon={item.icon}
            isActive={activeSubItem === item.label}
            onClick={() => setActiveSubItem(item.label)}
          />
        ))}
      </div>
    </div>
  );
};

export default SubMenu;
