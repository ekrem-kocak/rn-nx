import React from 'react';
import { FlatList, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Todo } from '@rn-nx/core';
import { colors, typography } from '@rn-nx/shared';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  loading: boolean;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export const TodoList = ({ todos, loading, onToggle, onDelete }: TodoListProps) => {
  if (loading) {
    return <ActivityIndicator size="large" color={colors.primary[600]} />;
  }

  return (
    <FlatList
      data={todos}
      renderItem={({ item }) => (
        <TodoItem item={item} onToggle={onToggle} onDelete={onDelete} />
      )}
      keyExtractor={(item) => item.id!}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Henüz görev eklenmemiş</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    ...typography.body,
    color: colors.gray[400],
  },
}); 