import React, { useState } from 'react';
import { View, Image, Platform, Pressable, Text, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { CreateEventDTO } from '../types/event.types';
import { Input } from './Input';
import { Button } from './Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
interface EventFormData extends Omit<CreateEventDTO, 'imageUrl'> {
  title: string;
  description: string;
  address: string;
  date: string;
  time: string;
}

interface EventFormProps {
  onSubmit: (data: EventFormData & { imageUri: string }) => Promise<void>;
  isLoading?: boolean;
}

export const EventForm: React.FC<EventFormProps> = ({ onSubmit, isLoading }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<'date' | 'time'>('date');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormData>({
    defaultValues: {
      title: '',
      description: '',
      address: '',
      date: new Date().toISOString(),
      time: new Date().toISOString(),
    },
  });

  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Fotoğraf seçilirken bir hata oluştu:', error);
    }
  };

  const handleFormSubmit = (data: EventFormData) => {
    if (!selectedImage) {
      return;
    }

    onSubmit({ ...data, imageUri: selectedImage });
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('tr-TR');
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <ScrollView className="flex-1">
      <View className="p-4 pb-10 gap-y-4">
        {selectedImage && (
          <Image source={{ uri: selectedImage }} className="w-full h-48 rounded-lg mb-4" resizeMode="contain" />
        )}

        <Button
          title={selectedImage ? 'Fotoğrafı Değiştir' : 'Fotoğraf Seç'}
          onPress={handleImagePick}
          variant="primary"
          icon={<Ionicons name="image" size={24} color="white" />}
        />

        <Controller
          control={control}
          name="title"
          rules={{ required: 'Başlık zorunludur' }}
          render={({ field: { onChange, value } }) => (
            <Input label="Etkinlik Başlığı" onChangeText={onChange} value={value} error={errors.title?.message} />
          )}
        />

        <Controller
          control={control}
          name="description"
          rules={{ required: 'Açıklama zorunludur' }}
          render={({ field: { onChange, value } }) => (
            <Input
              label="Açıklama"
              onChangeText={onChange}
              value={value}
              multiline
              numberOfLines={4}
              error={errors.description?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="address"
          rules={{ required: 'Adres zorunludur' }}
          render={({ field: { onChange, value } }) => (
            <Input label="Adres" onChangeText={onChange} value={value} error={errors.address?.message} />
          )}
        />

        <Controller
          control={control}
          name="date"
          rules={{ required: 'Tarih zorunludur' }}
          render={({ field: { onChange, value } }) => (
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1">Tarih</Text>
              <Pressable
                onPress={() => {
                  setPickerMode('date');
                  setShowDatePicker(true);
                }}
                className="p-3 border border-gray-300 rounded-md"
              >
                <Text>{formatDate(value)}</Text>
              </Pressable>
              {Platform.OS === 'ios' ? (
                showDatePicker && (
                  <DateTimePicker
                    value={value ? new Date(value) : new Date()}
                    mode="date"
                    display="spinner"
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(false);
                      if (selectedDate) {
                        onChange(selectedDate.toISOString());
                      }
                    }}
                  />
                )
              ) : (
                <DateTimePicker
                  value={value ? new Date(value) : new Date()}
                  mode="date"
                  onChange={(event, selectedDate) => {
                    if (selectedDate) {
                      onChange(selectedDate.toISOString());
                    }
                  }}
                />
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name="time"
          rules={{ required: 'Saat zorunludur' }}
          render={({ field: { onChange, value } }) => (
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1">Saat</Text>
              <Pressable
                onPress={() => {
                  setPickerMode('time');
                  setShowTimePicker(true);
                }}
                className="p-3 border border-gray-300 rounded-md"
              >
                <Text>{formatTime(value)}</Text>
              </Pressable>
              {Platform.OS === 'ios' ? (
                showTimePicker && (
                  <DateTimePicker
                    value={value ? new Date(value) : new Date()}
                    mode="time"
                    display="spinner"
                    onChange={(event, selectedDate) => {
                      setShowTimePicker(false);
                      if (selectedDate) {
                        onChange(selectedDate.toISOString());
                      }
                    }}
                  />
                )
              ) : (
                <DateTimePicker
                  value={value ? new Date(value) : new Date()}
                  mode="time"
                  onChange={(event, selectedDate) => {
                    if (selectedDate) {
                      onChange(selectedDate.toISOString());
                    }
                  }}
                />
              )}
            </View>
          )}
        />

        <Button
          title="Etkinlik Oluştur"
          onPress={handleSubmit(handleFormSubmit)}
          disabled={!selectedImage || isLoading}
          icon={<Ionicons name="add" size={24} color="white" />}
        />
      </View>
    </ScrollView>
  );
};
