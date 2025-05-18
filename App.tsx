import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/auth/AuthNavigator';
import MainNavigator from './src/core/MainNavigator';

import { User } from 'firebase/auth';
import { auth } from './src/config/firebaseConfig';

const App: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        return auth.onAuthStateChanged(setUser);
    }, []);

    return (
        <NavigationContainer>
            {user ? <MainNavigator/> : <AuthNavigator/>}
        </NavigationContainer>
    );
};

export default App;
