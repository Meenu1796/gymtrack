import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import SplashScreen   from './src/screens/SplashScreen';
import BodyMapScreen  from './src/screens/BodyMapScreen';
import ExercisesScreen from './src/screens/ExercisesScreen';
import PlanDetailScreen from './src/screens/PlanDetailScreen';
import MainTabs       from './src/navigation/MainTabs';
import { RootStackParamList } from './src/types';
import { Colors } from './src/theme/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Colors.bg },
            animation: 'slide_from_right',
          }}>
          <Stack.Screen name="Splash"     component={SplashScreen} />
          <Stack.Screen name="MainTabs"   component={MainTabs} />
          <Stack.Screen name="BodyMap"    component={BodyMapScreen} />
          <Stack.Screen name="Exercises"  component={ExercisesScreen} />
          <Stack.Screen name="PlanDetail" component={PlanDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
