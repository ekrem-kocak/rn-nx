import { useNavigation } from '@react-navigation/native';
import { Button, colors, Input, typography } from '@rn-nx/shared';
import { login, RootState } from '@rn-nx/store';
import { Controller, useForm } from 'react-hook-form';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

interface LoginModel {
  email: string;
  password: string;
}

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { control, handleSubmit } = useForm<LoginModel>();
  const { loading } = useSelector((state: RootState) => state.auth);

  const onSubmit = async (data: LoginModel) => {
    try {
      const resultAction = await dispatch(login(data));

      console.error(resultAction);
      // unwrapResult veya fulfillWithValue kullanarak sonucu kontrol edebiliriz
      if (login.fulfilled.match(resultAction)) {
        // Login başarılı
        navigation.navigate('Todo');
      } else {
        // Login başarısız
        console.log('Login hatası:', resultAction.error);
      }
    } catch (error) {
      console.log('Login işlemi sırasında hata:', error);
    }
  };

  const images = {
    logo: { uri: 'https://cdn-icons-png.flaticon.com/512/6244/6244710.png' },
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Image source={images.logo} style={styles.logo} />
            <Text style={styles.title}>Giriş Yap</Text>
          </View>

          <View style={styles.form}>
            <Controller
              control={control}
              name="email"
              rules={{
                required: 'Email zorunludur',
              }}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Input
                  placeholder="Email"
                  value={value}
                  onChangeText={onChange}
                  error={error?.message}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              rules={{
                required: 'Şifre zorunludur',
              }}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Input
                  placeholder="Password"
                  value={value}
                  onChangeText={onChange}
                  error={error?.message}
                  autoCapitalize="none"
                  secureTextEntry
                />
              )}
            />

            <Button
              title="Giriş Yap"
              onPress={handleSubmit(onSubmit)}
              loading={loading}
            />
            <View style={styles.footer}>
              <Text style={styles.footerText}>Hesabın yok mu?</Text>
              <Button
                title="Kayıt Ol"
                onPress={() => navigation.navigate('Register')}
                variant="outline"
                size="small"
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  scrollView: {
    padding: 24,
  },
  header: {
    alignItems: 'center',
  },
  title: {
    ...typography.h1,
  },
  subtitle: {},
  form: {
    marginTop: 24,
  },
  footer: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  footerText: {
    ...typography.body,
    color: colors.gray[600],
  },
});
