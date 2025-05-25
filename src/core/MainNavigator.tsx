import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CoursesScreen from '../tabs/Courses';
import TeacherScreen from '../tabs/Teacher';
import ProfileScreen from '../tabs/Profile';
import MainScreen from '../tabs/Home';

const Tab = createBottomTabNavigator();

const MainNavigator: React.FC = () => (
    <Tab.Navigator>
        <Tab.Screen name="Home" component={MainScreen}/>
        <Tab.Screen name={"Courses"} component={CoursesScreen}/>
        <Tab.Screen name={"Teach"} component={TeacherScreen}/>
        <Tab.Screen name={"Profile"} component={ProfileScreen}/>
    </Tab.Navigator>
);

export default MainNavigator;
