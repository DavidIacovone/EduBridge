import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import { GoogleAuthProvider, signInWithCredential, signInWithEmailAndPassword, } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession(); // Required for Expo login flow

type Props = {
    navigation: any;
};

const LoginScreen: React.FC<Props> = ({navigation}) => {
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
                        Alert.alert('Success', 'Signed in with Google!');
                    })
                    .catch((err) => {
                        Alert.alert('Firebase Auth Error', err.message);
                    });
            }
        }
    }, [response]);

    const handleEmailLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error: any) {
            Alert.alert('Login Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>EduBridge</Text>

            <TextInput
                placeholder="Email"
                style={styles.input}
                autoCapitalize="none"
                onChangeText={setEmail}
                value={email}
            />
            <TextInput
                placeholder="Password"
                style={styles.input}
                secureTextEntry
                onChangeText={setPassword}
                value={password}
            />

            <Button title="Login with Email" onPress={handleEmailLogin}/>
            <View style={styles.spacer}/>
            <Button
                title="Login with Google"
                onPress={() => promptAsync()}
                disabled={!request}
            />
            <View style={styles.spacer}/>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.link}>Don’t have an account? Register</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', padding: 20},
    title: {fontSize: 26, textAlign: 'center', marginBottom: 30},
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

export default LoginScreen;
