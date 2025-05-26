import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigator from './MainNavigator';
import CourseForm from './CourseForm';
import CourseDetailsScreen from './CourseDetailScreen';

const Stack = createNativeStackNavigator();

const AppNavigator: React.FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Main"
                component={MainNavigator}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="CourseForm"
                component={CourseForm}
                options={{title: 'Course Details'}}
            />
            <Stack.Screen
                name="CourseDetails"
                component={CourseDetailsScreen}
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;
