import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../Screen/HomeScreen/HomeScreen';
import { Ionicons } from '@expo/vector-icons';
import FavouriteScreen from '../Screen/FavouriteScreen/FavouriteScreen';
import ProfileScreen from '../Screen/ProfileScreen/ProfileScreen';
import ChatBot from '../Screen/ChatBot/ChatBot'
import Colors from '../Utils/Colors';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const Tab=createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{
        headerShown:false,
    }}>
        <Tab.Screen name='home'
        component={HomeScreen} 
            options={{
                tabBarLabel:'Search',
                tabBarActiveTintColor:Colors.PRIMARY,
                tabBarIcon:({color,size})=>(
                    <Ionicons name="search"
                    size={size} color={color} />

                )
        }}/>
        <Tab.Screen name='favourite'
        component={FavouriteScreen}
        options={{
            tabBarLabel:'Favourite',
            tabBarActiveTintColor:Colors.PRIMARY,
            tabBarIcon:({color,size})=>(
                <Ionicons name="heart"
                size={size} color={color} />

            )
        }}/> 

<Tab.Screen name='ChatBot'
        component={ChatBot}
        options={{
            tabBarLabel:'ChatBot',
            tabBarActiveTintColor:Colors.PRIMARY,
            tabBarIcon:({color,size})=>(
                <FontAwesome5 name="robot" size={size} color={color} />

            )
        }}/> 

        <Tab.Screen name='profile'
        component={ProfileScreen} 
        options={{
            tabBarLabel:'Profile',
            tabBarActiveTintColor:Colors.PRIMARY,
            tabBarIcon:({color,size})=>(
                <Ionicons name="person-circle-sharp"
                size={size} color={color} />

            )
        }}/>

    </Tab.Navigator>
)
}