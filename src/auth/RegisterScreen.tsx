import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithCredential, } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

type Props = {
    navigation: any;
};

const RegisterScreen: React.FC<Props> = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId: '430177732295-5r03tib0612g8b0s01dqqmvar9kvm6pn.apps.googleusercontent.com',
        webClientId: '430177732295-d8u0r55pl1qnoe2d5fcbuc8luaaanmqe.apps.googleusercontent.com',
    });

    useEffect(() => {
        if (response?.type === 'success') {
            const idToken = response.authentication?.idToken;
            if (idToken) {
                const credential = GoogleAuthProvider.credential(idToken);
                signInWithCredential(auth, credential)
                    .then(() => {
                    })
                    .catch((err) => {
                        Alert.alert('Firebase Auth Error', err.message);
                    });
            }
        }
    }, [response]);

    const handleEmailRegister = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            Alert.alert('Success', 'Account created!');
            navigation.navigate('Login');
        } catch (error: any) {
            Alert.alert('Registration Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>

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
                onPress={() => promptAsync()}
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
