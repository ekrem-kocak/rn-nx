import React, { useEffect, useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@rn-nx/store';
import { fetchTodos, addTodo, toggleTodo, deleteTodo } from '@rn-nx/store';
import { colors } from '@rn-nx/shared';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TodoHeader } from '../components/TodoHeader';
import { TodoInput } from '../components/TodoInput';
import { TodoList } from '../components/TodoList';

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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <TodoHeader
          title="Yapılacaklar"
          subtitle={user?.displayName || user?.email || ''}
        />
        <TodoInput
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmit={handleAddTodo}
        />
        <TodoList
          todos={todos}
          loading={loading}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
