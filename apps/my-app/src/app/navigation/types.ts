import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Main: NavigatorScreenParams<MainTabParamList>;
  CreateEvent: undefined;
  Login: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Profile: undefined;
};
