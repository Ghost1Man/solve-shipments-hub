import Logo from './Logo';
import CompanySelector from './CompanySelector';
import MainMenu from './MainMenu';
import UserSection from './UserSection';

interface HeaderProps {
  companies: string[];
  menuItems: string[];
  activeMenu: string;
  onMenuChange: (item: string) => void;
  username: string;
}

const Header = ({ companies, menuItems, activeMenu, onMenuChange, username }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary">
      <div className="flex items-center justify-between px-4 h-14">
        {/* Left Section */}
        <div className="flex items-center gap-6">
          <Logo />
          <CompanySelector companies={companies} />
        </div>

        {/* Center Section - Main Menu */}
        <MainMenu 
          items={menuItems} 
          activeItem={activeMenu} 
          onItemClick={onMenuChange} 
        />

        {/* Right Section */}
        <UserSection 
          username={username} 
          connectionStatus="connected" 
          latency={247} 
        />
      </div>
    </header>
  );
};

export default Header;
