import React from 'react';
import { View, Text } from 'react-native';
import { useAuthStore } from '@rn-nx/core';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const HomeScreen = () => {
  const user = useAuthStore((state) => state.user);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold mb-4">Ana Sayfa</Text>
      <Text className="text-lg">Hoş geldin, {user?.email}!</Text>

      {/* <Button title="Etkinlik Oluştur" onPress={() => navigation.navigate('CreateEvent')} className="mt-4" /> */}
    </View>
  );
};
