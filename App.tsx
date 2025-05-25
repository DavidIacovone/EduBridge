import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/auth/AuthNavigator';

import { User } from 'firebase/auth';
import { auth } from './src/config/firebaseConfig';
import AppNavigator from './src/core/AppNavigator';

const App: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        return auth.onAuthStateChanged(setUser);
    }, []);

    return (
        <NavigationContainer>
            {user ? <AppNavigator/> : <AuthNavigator/>}
        </NavigationContainer>
    );
};

export default App;
