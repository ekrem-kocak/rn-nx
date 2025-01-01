import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '@rn-nx/shared';

interface TodoHeaderProps {
  title: string;
  subtitle: string;
}

export const TodoHeader = ({ title, subtitle }: TodoHeaderProps) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  title: {
    ...typography.h1,
    color: colors.gray[900],
  },
  subtitle: {
    ...typography.body,
    color: colors.gray[600],
    marginTop: 4,
  },
}); 