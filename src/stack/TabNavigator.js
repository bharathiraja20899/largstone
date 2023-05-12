import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MarketingList from '../components/MarketingList';
import {appColors} from '../shared/appcolor';
import FragmentComponent from '../components/Fragment';
import { Image } from 'react-native';

const BottomTab = () => {
  const Tab = createBottomTabNavigator();

  const imgUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwKyj9BZQRSD_-_Q_XLZfXVqNd6b5U8inoYSdwW1qzKA&usqp=CAU&ec=48600113'

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: appColors.primary,
        },
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: '',
          tabBarShowLabel: false,
          tabBarActiveTintColor : appColors.light,
          tabBarIcon: ({color, size}) => (
            <AntDesign name="notification" color={color} size={size} />
          ),
        }}
        component={MarketingList}
        name="Home"
      />

      <Tab.Screen
        options={{
          tabBarLabel: '',
          tabBarShowLabel: false,
          tabBarActiveTintColor : appColors.light,
          tabBarIcon: ({color, size}) => (
            <Feather name="trending-up" color={color} size={size} />
          ),
        }}
        component={FragmentComponent}
        name="Second"
      />

      <Tab.Screen
        options={{
          tabBarLabel: '',
          tabBarShowLabel: false,
          tabBarActiveTintColor : appColors.light,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="thumbs-up-down" color={color} size={size} />
          ),
        }}
        component={FragmentComponent}
        name="Third"
      />

      <Tab.Screen
        options={{
          tabBarLabel: '',
          tabBarShowLabel: false,
          tabBarActiveTintColor : appColors.light,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="headset-sharp" color={color} size={size} />
          ),
        }}
        component={FragmentComponent}
        name="Fourth"
      />

      <Tab.Screen
        options={{
          tabBarLabel: '',
          tabBarShowLabel: false,
          tabBarActiveTintColor : appColors.light,
          tabBarIcon: ({color, size}) => (
            <Image 
            style={{height : size , width : size}}
            source={{uri : imgUrl}} />
          ),
        }}
        component={FragmentComponent}
        name="Fifth"
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
