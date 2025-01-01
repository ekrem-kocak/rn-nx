import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';
import { Input } from '@rn-nx/shared';
import { colors } from '@rn-nx/shared';

interface TodoInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export const TodoInput = ({ value, onChangeText, onSubmit, onCancel }: TodoInputProps) => {
  return (
    <View style={styles.container}>
      <Input
        placeholder="Yeni görev ekle"
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        autoFocus
        returnKeyType="done"
        onSubmitEditing={onSubmit}
      />
      <View style={styles.buttons}>
        <TouchableOpacity 
          style={[styles.button, styles.cancelButton]} 
          onPress={onCancel}
        >
          <Text style={styles.cancelButtonText}>İptal</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.addButton]} 
          onPress={onSubmit}
        >
          <Text style={styles.addButtonText}>Ekle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 16,
    paddingBottom: Platform.OS === 'ios' ? 16 : 16,
  },
  input: {
    backgroundColor: colors.gray[50],
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: colors.gray[100],
  },
  addButton: {
    backgroundColor: colors.primary[500],
  },
  cancelButtonText: {
    color: colors.gray[600],
    fontSize: 16,
    fontWeight: '500',
  },
  addButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '500',
  },
}); 