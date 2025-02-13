import React from 'react';
import { View, Text } from 'react-native';
import { useAuthStore } from '@rn-nx/core';

export const HomeScreen = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold mb-4">Ana Sayfa</Text>
      <Text className="text-lg">Hoş geldin, {user?.email}!</Text>
    </View>
  );
};
