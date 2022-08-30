import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type PropsNavigationStack = {
  Home: undefined;
  Comments: undefined;
  AddComment: undefined;
};

export type PropsNavigationBottom = {
  Home: undefined;
  Comments: undefined;
  AddComment: undefined;
};

export type PropsStack = NativeStackNavigationProp<PropsNavigationStack>;
export type PropsBottom = BottomTabNavigationProp<PropsNavigationBottom>;
