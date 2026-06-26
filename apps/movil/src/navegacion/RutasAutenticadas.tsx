import * as React from 'react';
import { View, Text } from 'react-native';

interface RutasAutenticadasProps {
  roles: string[];
}

export default function RutasAutenticadas({ roles }: RutasAutenticadasProps) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#0f172a', marginBottom: 8 }}>
        Panel de Control Móvil
      </Text>
      <Text style={{ color: '#64748b' }}>Roles del Usuario: {roles.join(', ')}</Text>
    </View>
  );
}
