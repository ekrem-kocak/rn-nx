import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input } from '@rn-nx/shared';

interface TodoInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
}

export const TodoInput = ({ value, onChangeText, onSubmit }: TodoInputProps) => {
  return (
    <View style={styles.inputContainer}>
      <Input
        placeholder="Yeni görev ekle"
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
      <Button
        title="Ekle"
        onPress={onSubmit}
        size="small"
        style={styles.addButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
  },
  input: {
    flex: 1,
  },
  addButton: {
    minWidth: 80,
  },
}); 