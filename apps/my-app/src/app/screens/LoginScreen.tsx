import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { AuthService } from '@rn-nx/core';
import { useNavigation } from '@react-navigation/native';

export const LoginScreen = () => {
  const navigation = useNavigation();

  const handleGoogleLogin = async () => {
    const { error } = await AuthService.signInWithGoogle();
    if (!error) {
      navigation.navigate('Main' as never);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-3xl font-bold mb-8 text-gray-800">Hoş Geldiniz</Text>
        {/* <Button
          icon={<Ionicons name="logo-google" size={24} color="white" />}
          title="Google ile Giriş Yap"
          onPress={handleGoogleLogin}
          className="w-[80%] bg-blue-500 py-4"
        /> */}
      </View>
    </SafeAreaView>
  );
};
