import { RootState } from '@rn-nx/store';
import { useSelector } from 'react-redux';
import { SafeAreaView, Text } from 'react-native';
export const TodoScreen = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <SafeAreaView>
      <Text>{user?.email}</Text>
    </SafeAreaView>
  );
};
