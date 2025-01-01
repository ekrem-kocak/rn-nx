import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@rn-nx/store';
import { fetchTodos, addTodo, toggleTodo, deleteTodo } from '@rn-nx/store';
import { Button, Input, colors, typography } from '@rn-nx/shared';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const TodoScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const { todos, loading } = useSelector((state: RootState) => state.todos);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchTodos(user.uid));
    }
  }, [dispatch, user?.uid]);

  const handleAddTodo = async () => {
    if (!newTodo.trim() || !user?.uid) return;
    await dispatch(addTodo({ title: newTodo, userId: user.uid }));
    setNewTodo('');
  };

  const handleToggleTodo = (id: string, completed: boolean) => {
    dispatch(toggleTodo({ id, completed: !completed }));
  };

  const handleDeleteTodo = (id: string) => {
    Alert.alert('Todo Sil', "Bu todo'yu silmek istediğinizden emin misiniz?", [
      { text: 'İptal', style: 'cancel' },
      {
        text: 'Sil',
        onPress: () => dispatch(deleteTodo(id)),
        style: 'destructive',
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.todoItem}
      onPress={() => handleToggleTodo(item.id, item.completed)}
    >
      <View style={styles.todoContent}>
        <View
          style={[styles.checkbox, item.completed && styles.checkboxChecked]}
        >
          {item.completed && (
            <Ionicons name="checkmark" size={16} color={colors.white} />
          )}
        </View>
        <Text
          style={[styles.todoText, item.completed && styles.todoTextCompleted]}
        >
          {item.title}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => handleDeleteTodo(item.id)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="trash-outline" size={20} color={colors.gray[400]} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Yapılacaklar</Text>
        <Text style={styles.subtitle}>{user?.displayName || user?.email}</Text>
      </View>

      <View style={styles.inputContainer}>
        <Input
          placeholder="Yeni görev ekle"
          value={newTodo}
          onChangeText={setNewTodo}
          style={styles.input}
        />
        <Button
          title="Ekle"
          onPress={handleAddTodo}
          size="small"
          style={styles.addButton}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary[600]} />
      ) : (
        <FlatList
          data={todos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Henüz görev eklenmemiş</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
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
  listContent: {
    padding: 20,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.gray[100],
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
