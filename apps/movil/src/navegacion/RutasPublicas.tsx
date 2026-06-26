import * as React from 'react';
import { View, Text } from 'react-native';

export default function RutasPublicas() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#0f172a', marginBottom: 8 }}>
        Acceso Público - Gestión Tesis UNT
      </Text>
      <Text style={{ color: '#64748b' }}>Pantalla de Login / Registro</Text>
    </View>
  );
}
