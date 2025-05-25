import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View, } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { auth } from '../config/firebaseConfig';
import { createCourse, updateCourse, } from '../services/courseService';
import { Course } from '../types/course';

type Params = {
    course?: Course;
};

const CourseForm = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<RouteProp<Record<string, Params>, string>>();

    const editing = Boolean(route.params?.course);
    const course = route.params?.course;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [subject, setSubject] = useState('');
    const [price, setPrice] = useState('');
    const [city, setCity] = useState('');

    useEffect(() => {
        if (editing && course) {
            setName(course.name);
            setDescription(course.description);
            setSubject(course.subject);
            setPrice(String(course.price));
            setCity(course.city);
        }
    }, [course]);

    const handleSubmit = async () => {
        if (!name || !description || !price || !subject || !city) {
            Alert.alert('Error', 'All fields are required.');
            return;
        }

        const user = auth.currentUser;
        if (!user) {
            Alert.alert('Error', 'Not authenticated.');
            return;
        }

        const courseData = {
            name,
            description,
            subject,
            price: Number(price),
            city,
            email: user.email ?? '',
            userId: user.uid,
        };

        try {
            if (editing && course) {
                await updateCourse(course.id, courseData);
                Alert.alert('Success', 'Course updated!');
            } else {
                await createCourse(courseData);
                Alert.alert('Success', 'Course created!');
            }
            navigation.goBack();
        } catch (error: any) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{editing ? 'Edit Course' : 'Create Course'}</Text>

            <TextInput
                placeholder="Course name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
            />
            <TextInput
                placeholder="Subject"
                value={subject}
                onChangeText={setSubject}
                style={styles.input}
            />
            <TextInput
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
                style={styles.input}
                keyboardType="numeric"
            />
            <TextInput
                placeholder="City"
                value={city}
                onChangeText={setCity}
                style={styles.input}
            />

            <Button title={editing ? 'Update Course' : 'Create Course'} onPress={handleSubmit}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {flex: 1, padding: 20},
    header: {fontSize: 22, fontWeight: '600', marginBottom: 16},
    input: {
        borderBottomWidth: 1,
        paddingVertical: 8,
        marginBottom: 12,
    },
});

export default CourseForm;
