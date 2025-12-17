import { Helmet } from 'react-helmet-async';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>SolveCargo - Sistema de Gestión Logística</title>
        <meta name="description" content="Panel de administración para gestión de envíos, entregas y logística corporativa" />
      </Helmet>
      <DashboardLayout />
    </>
  );
};

export default Index;
