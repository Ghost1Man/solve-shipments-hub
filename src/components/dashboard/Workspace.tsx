import { Inbox } from 'lucide-react';

const Workspace = () => {
  return (
    <div className="flex-1 flex items-center justify-center bg-workspace">
      <div className="text-center">
        <Inbox size={64} className="mx-auto mb-4 text-muted-foreground/50" />
        <p className="text-lg text-muted-foreground">
          Área de trabajo – aquí se cargarán formularios y tablas
        </p>
      </div>
    </div>
  );
};

export default Workspace;
