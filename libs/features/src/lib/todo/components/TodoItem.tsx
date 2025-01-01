import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography } from '@rn-nx/shared';
import { Todo } from '@rn-nx/core';

interface TodoItemProps {
  item: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export const TodoItem = ({ item, onToggle, onDelete }: TodoItemProps) => {
  const renderRightActions = () => (
    <TouchableOpacity
      style={styles.deleteAction}
      onPress={() => onDelete(item.id!)}
    >
      <Ionicons name="trash-outline" size={24} color={colors.white} />
    </TouchableOpacity>
  );

  return (
    <Swipeable renderRightActions={renderRightActions} overshootRight={false}>
      <TouchableOpacity
        style={styles.todoItem}
        onPress={() => onToggle(item.id!, item.completed)}
      >
        <View style={styles.todoContent}>
          <View style={[styles.checkbox, item.completed && styles.checkboxChecked]}>
            {item.completed && (
              <Ionicons name="checkmark" size={16} color={colors.white} />
            )}
          </View>
          <Text style={[styles.todoText, item.completed && styles.todoTextCompleted]}>
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: colors.white,
    marginBottom: 1,
  },
  todoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary[600],
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary[600],
  },
  todoText: {
    ...typography.body,
    color: colors.gray[900],
    flex: 1,
  },
  todoTextCompleted: {
    textDecorationLine: 'line-through',
    color: colors.gray[400],
  },
  deleteAction: {
    backgroundColor: colors.error[500],
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
}); 