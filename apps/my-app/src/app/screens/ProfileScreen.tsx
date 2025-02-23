import React from 'react';
import { View, Text } from 'react-native';
import { AuthService } from '@rn-nx/core';
import { useAuthStore } from '@rn-nx/core';
import { useNavigation } from '@react-navigation/native';

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const user = useAuthStore((state) => state.user);

  const handleLogout = async () => {
    const { error } = await AuthService.signOut();
    if (!error) {
      navigation.navigate('Login');
    }
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold mb-4">Profil</Text>
      <Text className="text-lg mb-2">Email: {user?.email}</Text>
      {/* <Button title="Çıkış Yap" variant="secondary" onPress={handleLogout} className="mt-8" /> */}
    </View>
  );
};
