import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Button, FlatList, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { auth } from '../config/firebaseConfig';
import { deleteCourse, getCoursesByUserId } from '../services/courseService';
import { Course } from '../types/course';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const TeacherScreen = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<any>();

    const loadCourses = async () => {
        try {
            setLoading(true);
            const userId = auth.currentUser?.uid;
            if (!userId) return;
            const data = await getCoursesByUserId(userId);
            setCourses(data);
        } catch (error) {
            console.error('Error loading courses:', error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadCourses();
        }, [])
    );

    const handleDelete = async (id: string) => {
        try {
            await deleteCourse(id);
            Alert.alert('Deleted', 'Course has been removed.');
            loadCourses();
        } catch (error) {
            Alert.alert('Error', 'Failed to delete course.');
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Create New Course" onPress={() => navigation.navigate('CourseForm')}/>

            {loading ? (
                <ActivityIndicator size="large" style={{marginTop: 32}}/>
            ) : courses.length === 0 ? (
                <Text style={styles.emptyText}>You haven’t created any courses yet.</Text>
            ) : (
                <FlatList
                    data={courses}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{paddingTop: 16}}
                    renderItem={({item}) => (
                        <View style={styles.card}>
                            <Text style={styles.title}>{item.name}</Text>
                            <Text>{item.description}</Text>
                            <Text style={styles.city}>📍 {item.city} — {item.price} PLN</Text>
                            <View style={styles.actions}>
                                <TouchableOpacity
                                    style={[styles.button, styles.editButton]}
                                    onPress={() => navigation.navigate('CourseForm', {course: item})}
                                >
                                    <Text style={styles.buttonText}>Edit</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.button, styles.deleteButton]}
                                    onPress={() => handleDelete(item.id)}
                                >
                                    <Text style={styles.buttonText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {flex: 1, padding: 16},
    card: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 12,
        marginBottom: 12,
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    title: {fontWeight: 'bold', fontSize: 16},
    city: {marginTop: 4, color: '#666'},
    emptyText: {
        marginTop: 32,
        textAlign: 'center',
        fontSize: 16,
        color: '#888',
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 4,
    },
    editButton: {
        backgroundColor: '#1E90FF',
    },
    deleteButton: {
        backgroundColor: '#FF4C4C',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        textAlign: 'center',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },

});

export default TeacherScreen;
