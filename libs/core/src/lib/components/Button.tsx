import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, ActivityIndicator, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary';
  className?: string;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  className = '',
  loading,
  icon,
  iconPosition = 'left',
  ...props
}) => {
  const baseStyles = 'px-6 py-3 rounded-xl items-center justify-center';
  const variantStyles = {
    primary: 'bg-blue-500',
    secondary: 'bg-gray-500',
  };
  const disabledStyles = props.disabled ? 'opacity-50' : '';

  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    <TouchableOpacity className={twMerge(baseStyles, variantStyles[variant], disabledStyles, className)} {...props}>
      {loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <View className="flex-row items-center">
          {icon && iconPosition === 'left' && <View className="mr-2">{icon}</View>}
          <Text className="text-white font-semibold">{title}</Text>
          {icon && iconPosition === 'right' && <View className="ml-2">{icon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};
