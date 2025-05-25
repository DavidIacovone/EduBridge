import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithCredential, } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { createUser } from '../services/userService';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

type Props = {
    navigation: any;
};

const RegisterScreen: React.FC<Props> = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [city, setCity] = useState('');

    const [request, _, promptAsync] = Google.useAuthRequest({
        iosClientId: '430177732295-5r03tib0612g8b0s01dqqmvar9kvm6pn.apps.googleusercontent.com',
        webClientId: '430177732295-d8u0r55pl1qnoe2d5fcbuc8luaaanmqe.apps.googleusercontent.com',
    });

    const handleEmailRegister = async () => {
        try {
            const data = await createUserWithEmailAndPassword(auth, email, password);
            await createUser(
                {email, name, city, balance: 0},
                data.user.uid
            );
            Alert.alert('Success', 'Account created!');
            navigation.navigate('Login');
        } catch (error: any) {
            Alert.alert('Registration Error', error.message);
        }
    };

    const handleGoogleRegister = async () => {
        try {
            const result = await promptAsync();

            if (result.type !== 'success' || !result.authentication?.idToken) {
                Alert.alert('Google Sign-In Cancelled or Failed');
                return;
            }

            const credential = GoogleAuthProvider.credential(result.authentication.idToken);
            const authResult = await signInWithCredential(auth, credential);
            const user = authResult.user;

            const fallbackName = user.displayName ?? name;
            const fallbackCity = city || 'Unknown';

            await createUser(
                {
                    name: fallbackName,
                    email: user.email ?? '',
                    city: fallbackCity,
                    balance: 0,
                },
                user.uid
            );

            Alert.alert('Success', 'Signed in with Google!');
        } catch (error: any) {
            Alert.alert('Google Registration Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>

            <TextInput
                placeholder="Name"
                style={styles.input}
                autoCapitalize="none"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                placeholder="Your city i.e Warsaw"
                style={styles.input}
                autoCapitalize="none"
                value={city}
                onChangeText={setCity}
            />

            <TextInput
                placeholder="Email"
                style={styles.input}
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                placeholder="Password"
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <Button title="Register with Email" onPress={handleEmailRegister}/>
            <View style={styles.spacer}/>
            <Button
                title="Register with Google"
                onPress={handleGoogleRegister}
                disabled={!request}
            />

            <View style={styles.spacer}/>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.link}>Already have an account? Log in</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', padding: 20},
    title: {fontSize: 24, textAlign: 'center', marginBottom: 20},
    input: {
        borderBottomWidth: 1,
        marginBottom: 12,
        paddingVertical: 8,
        paddingHorizontal: 4,
    },
    spacer: {height: 16},
    link: {
        color: '#1E90FF',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default RegisterScreen;
