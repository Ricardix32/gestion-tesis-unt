import * as React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

export default function PantallaCarga() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc' }}>
      <ActivityIndicator size="large" color="#2563eb" />
      <Text style={{ marginTop: 12, color: '#64748b', fontWeight: '500' }}>
        Verificando sesión segura...
      </Text>
    </View>
  );
}
