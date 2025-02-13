import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ title, variant = 'primary', className, ...props }) => {
  const baseStyles = 'px-6 py-3 rounded-lg items-center justify-center';
  const variantStyles = {
    primary: 'bg-blue-500',
    secondary: 'bg-gray-500',
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    <TouchableOpacity className={twMerge(baseStyles, variantStyles[variant], className)} {...props}>
      <Text className="text-white font-semibold">{title}</Text>
    </TouchableOpacity>
  );
};
