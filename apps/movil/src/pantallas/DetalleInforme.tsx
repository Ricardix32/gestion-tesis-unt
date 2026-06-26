import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking } from 'react-native';
import { useQuery } from 'react-query';
import api from '../api/cliente';

export default function DetalleInforme({ route }: any) {
  const { informeId } = route.params;

  const { data: informe, isLoading } = useQuery(['informe', informeId], async () => {
    const res = await api.get(`/informes/${informeId}`);
    return res.data;
  });

  if (isLoading) {
    return <Text className="p-4 text-center">Cargando estado...</Text>;
  }

  return (
    <View className="flex-1 bg-gray-100">
      <View className="bg-white p-4 mb-2 shadow-sm">
        <Text className="text-lg font-bold">Estado del Informe</Text>
        <Text className="text-blue-600 capitalize">{informe?.estado?.replace('_', ' ') || ''}</Text>
      </View>

      <Text className="px-4 py-2 font-semibold text-gray-600">Versiones Enviadas</Text>
      <FlatList
        data={informe?.versiones || []}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => (
          <View className="bg-white p-4 mb-1 flex-row justify-between items-center">
            <View>
              <Text className="font-bold">{item.version_label}</Text>
              <Text className="text-sm text-gray-500">Plagio: {item.porcentaje_similitud}%</Text>
            </View>
            <TouchableOpacity 
              onPress={() => Linking.openURL(item.url_almacenamiento)}
              className="bg-gray-200 px-3 py-1 rounded"
            >
              <Text className="text-sm">Ver PDF</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
