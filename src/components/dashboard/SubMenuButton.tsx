import { LucideIcon } from 'lucide-react';

interface SubMenuButtonProps {
  label: string;
  icon?: LucideIcon;
  isActive?: boolean;
  onClick?: () => void;
}

const SubMenuButton = ({ label, icon: Icon, isActive = false, onClick }: SubMenuButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center gap-1.5
        min-w-[100px] px-4 py-3 rounded
        border transition-all duration-150
        ${isActive 
          ? 'bg-menuActive text-menuActive-foreground border-menuActive shadow-sm' 
          : 'bg-card text-card-foreground border-border hover:border-muted-foreground hover:shadow-sm'
        }
      `}
    >
      {Icon && <Icon size={20} />}
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
};

export default SubMenuButton;
