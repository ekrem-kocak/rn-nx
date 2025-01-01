import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { register, RootState } from '@rn-nx/store';
import { Input, Button, colors, typography } from '@rn-nx/shared';
import { Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface RegisterForm {
  email: string;
  password: string;
  displayName: string;
}

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const { control, handleSubmit } = useForm<RegisterForm>();

  const onSubmit = async (data: RegisterForm) => {
    await dispatch(register(data));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Kayıt Ol</Text>
          </View>

          <View style={styles.form}>
            <Controller
              control={control}
              name="displayName"
              rules={{ required: 'İsim zorunludur' }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Input
                  placeholder="İsminiz"
                  onChangeText={onChange}
                  value={value}
                  error={error?.message}
                  autoCapitalize="words"
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              rules={{
                required: 'Email zorunludur',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Geçerli bir email adresi giriniz',
                },
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Input
                  placeholder="Email adresiniz"
                  onChangeText={onChange}
                  value={value}
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
                minLength: {
                  value: 6,
                  message: 'Şifre en az 6 karakter olmalıdır',
                },
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Input
                  placeholder="Şifreniz"
                  onChangeText={onChange}
                  value={value}
                  error={error?.message}
                  secureTextEntry
                />
              )}
            />

            <Button
              title="Kayıt Ol"
              onPress={handleSubmit(onSubmit)}
              loading={loading}
              variant="primary"
              size="large"
              fullWidth
              style={styles.button}
            />

            <View style={styles.footer}>
              <Text style={styles.footerText}>Zaten hesabınız var mı?</Text>
              <Button
                title="Giriş Yap"
                variant="outline"
                size="small"
                onPress={() => navigation.navigate('Login')}
                style={styles.loginButton}
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
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    alignItems: 'center',
  },
  title: {
    ...typography.h1,
    color: colors.gray[900],
    marginBottom: 8,
  },
  form: {
    gap: 16,
    marginTop: 24,
  },
  button: {
    marginTop: 8,
  },
  error: {
    color: colors.error[500],
    ...typography.caption,
    textAlign: 'center',
  },
  footer: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  footerText: {
    ...typography.body,
    color: colors.gray[600],
  },
  loginButton: {
    marginLeft: 8,
  },
});
