import { LogOut } from 'lucide-react';
import ConnectionStatus from './ConnectionStatus';

interface UserSectionProps {
  username: string;
  connectionStatus: 'connected' | 'disconnected';
  latency?: number;
}

const UserSection = ({ username, connectionStatus, latency }: UserSectionProps) => {
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium text-primary-foreground">{username}</span>
      
      <button 
        className="flex items-center gap-2 px-3 py-1.5 bg-exit hover:bg-exit-hover text-primary-foreground text-sm font-medium rounded transition-colors duration-150"
      >
        <LogOut size={14} />
        SALIR
      </button>
      
      <ConnectionStatus status={connectionStatus} latency={latency} />
    </div>
  );
};

export default UserSection;
