import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Button, ScrollView, StyleSheet, Text, TextInput, View, } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { auth } from '../config/firebaseConfig';
import { getUserById, updateUser } from '../services/userService';
import { User } from '../types/user';

const ProfileScreen = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);

    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [university, setUniversity] = useState('');

    const navigation = useNavigation<any>();

    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigation.navigate('Main');
        } catch (err) {
            Alert.alert('Logout Error', 'Failed to log out. Please try again.');
        }
    };


    const loadUser = async () => {
        try {
            setLoading(true);
            const uid = auth.currentUser?.uid;
            if (!uid) return;

            const userData = await getUserById(uid);
            if (!userData) throw new Error('User not found');

            setUser(userData);
            setName(userData.name);
            setCity(userData.city);
            setUniversity(userData.university ?? '');
        } catch (err) {
            Alert.alert('Error', 'Failed to load user data');
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadUser();
        }, [])
    );

    const handleSave = async () => {
        if (!user) return;

        try {
            await updateUser(user.id, {name, city, university});
            Alert.alert('Saved', 'Your profile has been updated.');
            setEditing(false);
            loadUser();
        } catch (err) {
            Alert.alert('Error', 'Failed to update profile.');
        }
    };

    if (loading || !user) {
        return <ActivityIndicator style={{flex: 1}} size="large"/>;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>My Profile</Text>

            <View style={styles.balanceCard}>
                <Text style={styles.balanceLabel}>Balance</Text>
                <Text style={styles.balanceValue}>{user.balance.toFixed(2)} PLN</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    editable={editing}
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                />

                <Text style={styles.label}>Email</Text>
                <TextInput value={user.email} editable={false} style={styles.inputDisabled}/>

                <Text style={styles.label}>University</Text>
                <TextInput
                    editable={editing}
                    value={university}
                    onChangeText={setUniversity}
                    style={styles.input}
                />

                <Text style={styles.label}>City</Text>
                <TextInput
                    editable={editing}
                    value={city}
                    onChangeText={setCity}
                    style={styles.input}
                />
            </View>

            {editing ? (
                <Button title="Save Changes" onPress={handleSave}/>
            ) : (
                <Button title="Edit Profile" onPress={() => setEditing(true)}/>
            )}
            <View style={{marginTop: 32}}>
                <Button title="Log out" color="#FF3B30" onPress={handleLogout}/>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 40,
        backgroundColor: '#f8f8f8',
    },
    header: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 20,
        textAlign: 'center',
    },
    balanceCard: {
        backgroundColor: '#1E90FF',
        borderRadius: 10,
        padding: 20,
        marginBottom: 24,
        alignItems: 'center',
    },
    balanceLabel: {
        color: '#fff',
        fontSize: 16,
    },
    balanceValue: {
        fontSize: 28,
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 8,
    },
    section: {
        marginBottom: 24,
    },
    label: {
        fontWeight: '600',
        marginBottom: 6,
        color: '#444',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 12,
        backgroundColor: '#fff',
    },
    inputDisabled: {
        backgroundColor: '#eee',
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 12,
        color: '#777',
    },
});

export default ProfileScreen;
