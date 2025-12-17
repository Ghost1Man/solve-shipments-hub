interface ConnectionStatusProps {
  status: 'connected' | 'disconnected';
  latency?: number;
}

const ConnectionStatus = ({ status, latency }: ConnectionStatusProps) => {
  const isConnected = status === 'connected';
  
  return (
    <div 
      className={`
        px-3 py-1.5 rounded text-xs font-medium
        ${isConnected 
          ? 'bg-status-online text-primary-foreground' 
          : 'bg-exit text-primary-foreground'
        }
      `}
    >
      {isConnected ? `CONECTADO (${latency} ms)` : 'DESCONECTADO'}
    </div>
  );
};

export default ConnectionStatus;
