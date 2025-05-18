import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';

const Tab = createBottomTabNavigator();

// Placeholder screen
const HomeScreen = () => (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Welcome to CampusTutor!</Text>
    </View>
);

const MainNavigator: React.FC = () => (
    <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen}/>
        {/* Future tabs: Tutors, Schedule, Profile, etc. */}
    </Tab.Navigator>
);

export default MainNavigator;
