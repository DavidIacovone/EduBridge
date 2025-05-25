import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, View, } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { getUserById } from '../services/userService';
import { getCoursesByCity } from '../services/courseService';
import { auth } from '../config/firebaseConfig';
import { Course } from '../types/course';

const CoursesScreen = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [filtered, setFiltered] = useState<Course[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const userId = auth.currentUser?.uid;
            if (!userId) return;

            const user = await getUserById(userId);
            if (!user) throw new Error('User not found');

            const city = user.city;
            const data = await getCoursesByCity(city);

            setCourses(data);
            setFiltered(data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchCourses();
        }, [])
    );

    const handleSearch = (text: string) => {
        setSearch(text);
        const filteredData = courses.filter((course) =>
            course.name.toLowerCase().includes(text.toLowerCase())
        );
        setFiltered(filteredData);
    };

    if (loading) return <ActivityIndicator style={{flex: 1}} size="large"/>;

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Search courses"
                value={search}
                onChangeText={handleSearch}
                style={styles.searchBar}
            />
            {filtered.length === 0 ? (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>No courses found in your city</Text>
                </View>
            ) : (
                <FlatList
                    data={filtered}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <View style={styles.courseCard}>
                            <View style={styles.cardRow}>
                                <View style={styles.courseInfo}>
                                    <Text style={styles.courseName}>{item.name}</Text>
                                    <Text style={styles.courseDesc}>{item.description}</Text>
                                    <Text style={styles.courseLoc}>📍 {item.city}</Text>
                                </View>
                                <View style={styles.priceBox}>
                                    <Text style={styles.priceText}>{item.price} PLN</Text>
                                </View>
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
    searchBar: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginBottom: 12,
    },
    courseCard: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 16,
        marginBottom: 12,
        backgroundColor: '#fff',
        elevation: 1,
    },
    courseName: {fontSize: 18, fontWeight: '600'},
    courseDesc: {fontSize: 14, color: '#555', marginTop: 4},
    courseLoc: {fontSize: 12, color: '#999', marginTop: 6},
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    emptyText: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    priceBox: {
        backgroundColor: '#f1f1f1',
        padding: 10,
        borderRadius: 8,
        marginLeft: 12,
        minWidth: 60,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    priceText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1E90FF',
    },
    courseInfo: {
        flex: 1,
    },
});

export default CoursesScreen;
