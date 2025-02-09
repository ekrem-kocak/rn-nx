/* eslint-disable @nx/enforce-module-boundaries */
import images from 'apps/my-app/constants/images';
import icons from 'apps/my-app/constants/icons';
import { ScrollView, Image, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignIn() {
  const handleLogin = () => {
    console.log('Login');
  };

  return (
    <SafeAreaView className="bg-white h-full">
      {/* NOTE: contentContainerClassName => 
      
      */}
      <ScrollView contentContainerClassName="h-full">
        <Image source={images.onboarding as never} className="w-full h-4/6" resizeMode="contain" />

        <View className="px-10">
          <Text className="text-base text-center uppercase font-rubik-medium text-black-200">Welcome to ReState</Text>

          <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-2">
            Let's Get You Closer to {'\n'}
            <Text className="text-primary-300">Your Ideal Home</Text>
          </Text>

          <TouchableOpacity
            onPress={handleLogin}
            className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5 flex flex-row items-center justify-center gap-x-2"
          >
            <Image source={icons.google as never} className="w-6 h-6" resizeMode="contain"></Image>
            <Text className="text-black-300 font-rubik-medium text-base">Continue with Google</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
