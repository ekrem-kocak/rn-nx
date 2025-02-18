import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { EventForm, EventService, useEventStore, CreateEventDTO, useAuthStore } from '@rn-nx/core';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

interface FormData {
  title: string;
  description: string;
  address: string;
  date: string;
  time: string;
  imageUri: string;
}

export const CreateEventScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const { addEvent } = useEventStore();
  const user = useAuthStore((state) => state.user);

  const handleFormSubmit = async (data: FormData) => {
    try {
      if (!user?.id) {
        Alert.alert('Hata', 'Oturum açmanız gerekiyor');
        return;
      }

      setIsLoading(true);

      // Önce fotoğrafı yükle
      const imageUrl = await EventService.uploadEventImage(data.imageUri);

      // Event'i oluştur
      const eventData: CreateEventDTO = {
        title: data.title,
        description: data.description,
        address: data.address,
        date: data.date,
        time: data.time,
        imageUrl,
        createdBy: user.id,
      };

      const result = await EventService.createEvent(eventData);

      addEvent(result);

      Alert.alert(
        'Başarılı',
        'Etkinlik başarıyla oluşturuldu',
        [
          {
            text: 'Tamam',
            onPress: () => {
              navigation.goBack();
            },
          },
        ],
        { cancelable: false },
      );
    } catch (error) {
      let errorMessage = 'Bir hata oluştu';

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      Alert.alert('Hata', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center p-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View className="flex-1 items-center -ml-8">
          <Text className="text-lg font-semibold">Etkinlik Oluştur</Text>
        </View>
      </View>

      <EventForm onSubmit={handleFormSubmit} isLoading={isLoading} />
    </View>
  );
};
