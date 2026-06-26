import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../contextos/AuthContext';
import RutasAutenticadas from './RutasAutenticadas';
import RutasPublicas from './RutasPublicas';
import PantallaCarga from './PantallaCarga';

export default function AppNavegador() {
  const { usuario, cargando } = useAuth();

  if (cargando) return <PantallaCarga />;

  return (
    <NavigationContainer>
      {usuario ? <RutasAutenticadas roles={usuario.roles || []} /> : <RutasPublicas />}
    </NavigationContainer>
  );
}
