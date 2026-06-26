import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import api from '../api/cliente';

export default function RegistroAsesoria({ route, navigation }: any) {
  const { proyectoId } = route.params;
  const [bitacora, setBitacora] = useState('');

  const guardarAsesoria = async () => {
    try {
      await api.post(`/proyectos/${proyectoId}/asesorias`, {
        bitacora_notes: bitacora,
        fecha_hora: new Date().toISOString(),
      });
      Alert.alert('Éxito', 'Asesoría registrada correctamente');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar la asesoría');
    }
  };

  return (
    <View className="flex-1 p-4 bg-gray-50">
      <Text className="text-lg font-bold mb-2">Nueva Asesoría</Text>
      <TextInput
        className="bg-white p-4 rounded-lg border border-gray-300 min-h-[150px]"
        multiline
        placeholder="Ingrese las notas y acuerdos de la sesión..."
        value={bitacora}
        onChangeText={setBitacora}
        textAlignVertical="top"
      />
      <TouchableOpacity 
        className="bg-blue-600 p-4 rounded-lg mt-4 items-center"
        onPress={guardarAsesoria}
      >
        <Text className="text-white font-bold">Guardar Registro</Text>
      </TouchableOpacity>
    </View>
  );
}
