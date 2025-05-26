import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getUserById } from '../services/userService';
import { Course } from '../types/course';
import { User } from '../types/user';

type RouteParams = {
    course: Course;
};

const CourseDetailsScreen = () => {
    const route = useRoute<any>();
    const {course} = route.params as RouteParams;

    const [owner, setOwner] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOwner = async () => {
            try {
                const user = await getUserById(course.userId);
                setOwner(user);
            } catch (error) {
                console.error('Failed to load owner info:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOwner();
    }, [course.userId]);

    const handleBooking = () => {
        Alert.alert('Booking Confirmed', `You have booked "${course.name}"!`);
        // You can also navigate, or store a booking in Firestore here
    };

    if (loading) {
        return <ActivityIndicator size="large" style={{flex: 1}}/>;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>{course.name}</Text>
                <Text style={styles.subject}>{course.subject}</Text>
                <Text style={styles.description}>{course.description}</Text>

                <View style={styles.section}>
                    <Text style={styles.label}>📍 Location</Text>
                    <Text style={styles.value}>{course.city}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>🏫 University</Text>
                    <Text style={styles.value}>{owner?.university ?? 'Not specified'}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>💰 Price</Text>
                    <Text style={styles.price}>{course.price} PLN</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>👤 Tutor</Text>
                    <Text style={styles.value}>{owner?.name ?? 'Unknown'}</Text>
                    <Text style={styles.value}>{owner?.email ?? 'N/A'}</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleBooking}>
                <Text style={styles.buttonText}>Book Course</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 40,
        backgroundColor: '#f4f8ff',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: {width: 0, height: 2},
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 6,
        color: '#1E90FF',
    },
    subject: {
        fontSize: 16,
        fontWeight: '500',
        color: '#666',
        marginBottom: 12,
    },
    description: {
        fontSize: 15,
        color: '#444',
        marginBottom: 20,
    },
    section: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#444',
        marginBottom: 2,
    },
    value: {
        fontSize: 16,
        color: '#222',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E90FF',
        marginTop: 4,
    },
    button: {
        marginTop: 24,
        backgroundColor: '#1E90FF',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        elevation: 2,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
});

export default CourseDetailsScreen;
