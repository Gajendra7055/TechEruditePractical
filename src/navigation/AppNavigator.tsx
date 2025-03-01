
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import LoginScreen from '../screens/LoginScreen';
import EventListScreen from '../screens/EventListScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';

const Stack = createStackNavigator<any>();
const Tab = createBottomTabNavigator<any>();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}: any) => ({
        headerShown: false,
        
        tabBarIcon: ({focused, color, size}: any) => {
          let iconName: any;

          if (route.name === 'Events') {
            iconName = 'calendar';
          } else if (route.name === 'Favorites') {
            iconName = 'heart';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          } else if (route.name === 'Search') {
            iconName = 'search';
          }

          return <Icon name={iconName} size={18} color={color} />;
        },
        tabBarActiveTintColor: '#34A853',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#fff',
          // borderTopWidth: 1,
          borderTopColor: '#ccc',
          padding: 50,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
      })}>
      <Tab.Screen name="Events" component={EventListScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainTabs}
          // options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
