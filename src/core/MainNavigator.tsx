import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import CoursesScreen from '../tabs/Courses';
import TeacherScreen from '../tabs/Teacher';

const Tab = createBottomTabNavigator();

// Placeholder screen
const HomeScreen = () => (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Welcome to EduBridge!</Text>
    </View>
);

const MainNavigator: React.FC = () => (
    <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name={"Courses"} component={CoursesScreen}/>
        <Tab.Screen name={"Teach"} component={TeacherScreen}/>
    </Tab.Navigator>
);

export default MainNavigator;
