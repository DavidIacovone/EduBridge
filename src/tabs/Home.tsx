import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { Subjects } from '../types/subjects';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getSubjectIcon } from '../utils/getSubjectIcon';
import { useNavigation } from '@react-navigation/native';

const MainScreen: React.FC = () => {
    const subjects = Object.values(Subjects);
    const navigation = useNavigation<any>();

    const renderItem = ({item}: { item: string }) => (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Courses', {subject: item})}>
            <MaterialCommunityIcons
                name={getSubjectIcon(item) as any}
                size={32}
                color="#fff"
                style={{marginBottom: 8}}
            />
            <Text style={styles.subject}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Explore Subjects</Text>

            <FlatList
                data={subjects}
                keyExtractor={(item) => item}
                renderItem={renderItem}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.grid}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#f4f8ff', padding: 16},
    header: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    grid: {
        paddingBottom: 20,
    },
    row: {
        justifyContent: 'space-between',
    },
    card: {
        flex: 1,
        backgroundColor: '#1E90FF',
        paddingVertical: 24,
        margin: 8,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: {width: 0, height: 3},
    },
    subject: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default MainScreen;
