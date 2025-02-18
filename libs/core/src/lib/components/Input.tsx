import React from 'react';
import { TextInput, TextInputProps, View, Text } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <View className="mb-4">
      {label && <Text className="text-gray-700 mb-2 font-medium">{label}</Text>}
      <TextInput
        className={twMerge(
          'px-4 py-3 border border-gray-300 rounded-lg bg-white',
          error && 'border-red-500',
          className,
        )}
        {...props}
      />
      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
};
