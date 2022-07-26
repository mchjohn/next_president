import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type PropsNavigationStack = {
  Home: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

export type PropsStack = NativeStackNavigationProp<PropsNavigationStack>;
