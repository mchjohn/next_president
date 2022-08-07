import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type PropsNavigationStack = {
  Home: undefined;
  Comments: undefined;
};

export type PropsStack = NativeStackNavigationProp<PropsNavigationStack>;
