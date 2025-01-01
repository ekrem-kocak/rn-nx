import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Alert, 
  View, 
  Text, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  Keyboard
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@rn-nx/store';
import { fetchTodos, addTodo, toggleTodo, deleteTodo } from '@rn-nx/store';
import { colors } from '@rn-nx/shared';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BlurView } from 'expo-blur';
import { TodoHeader } from '../components/TodoHeader';
import { TodoInput } from '../components/TodoInput';
import { TodoList } from '../components/TodoList';
import { Ionicons } from '@expo/vector-icons';

export const TodoScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const { todos, loading } = useSelector((state: RootState) => state.todos);
  const [newTodo, setNewTodo] = useState('');
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchTodos(user.uid));
    }
  }, [dispatch, user?.uid]);

  const handleAddTodo = async () => {
    if (!newTodo.trim() || !user?.uid) return;
    await dispatch(addTodo({ title: newTodo, userId: user.uid }));
    setNewTodo('');
    setShowInput(false);
    Keyboard.dismiss();
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

  const handleCancel = () => {
    setShowInput(false);
    setNewTodo('');
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            <TodoHeader
              title="Yapılacaklar"
              subtitle={`${todos.length} görev`}
              rightComponent={
                <View style={styles.headerRight}>
                  <Ionicons 
                    name="search" 
                    size={24} 
                    color={colors.gray[600]} 
                    style={styles.headerIcon}
                  />
                  <Ionicons 
                    name="options" 
                    size={24} 
                    color={colors.gray[600]}
                  />
                </View>
              }
            />
            
            <TodoList
              todos={todos}
              loading={loading}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
              ListHeaderComponent={
                <View style={styles.statsContainer}>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>
                      {todos.filter(t => !t.completed).length}
                    </Text>
                    <Text style={styles.statLabel}>Aktif</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>
                      {todos.filter(t => t.completed).length}
                    </Text>
                    <Text style={styles.statLabel}>Tamamlanan</Text>
                  </View>
                </View>
              }
            />
          </View>

          {!showInput && (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowInput(true)}
            >
              <Ionicons name="add" size={24} color={colors.white} />
            </TouchableOpacity>
          )}
        </SafeAreaView>

        {showInput && (
          <BlurView 
            intensity={90} 
            tint="light" 
            style={[
              styles.inputContainer,
              Platform.OS === 'ios' && { paddingBottom: 20 }
            ]}
          >
            <TodoInput
              value={newTodo}
              onChangeText={setNewTodo}
              onSubmit={handleAddTodo}
              onCancel={handleCancel}
            />
          </BlurView>
        )}
      </GestureHandlerRootView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: colors.white,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    shadowColor: colors.gray[900],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.gray[900],
  },
  statLabel: {
    fontSize: 14,
    color: colors.gray[500],
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.gray[200],
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary[900],
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
