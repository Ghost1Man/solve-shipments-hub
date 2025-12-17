interface MainMenuProps {
  items: string[];
  activeItem: string;
  onItemClick: (item: string) => void;
}

const MainMenu = ({ items, activeItem, onItemClick }: MainMenuProps) => {
  return (
    <nav className="flex items-center">
      {items.map((item) => {
        const isActive = item === activeItem;
        return (
          <button
            key={item}
            onClick={() => onItemClick(item)}
            className={`
              px-4 py-3 text-sm font-medium transition-colors duration-150
              ${isActive 
                ? 'bg-menuActive text-menuActive-foreground' 
                : 'text-primary-foreground hover:bg-primary-foreground/10'
              }
            `}
          >
            {item}
          </button>
        );
      })}
    </nav>
  );
};

export default MainMenu;
