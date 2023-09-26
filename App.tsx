import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import AuthNavigation from './src/navigation/AuthNavigation';
import {Provider} from 'react-redux';
import {store} from './src/utilis/redux/Store';
import {UserContext} from './src/utilis/context/UserContext';
import {colors} from './src/assets/styles/colors';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: colors.pistagreen2,
    flex: 1,
  };

  return (
    <Provider store={store}>
      <UserContext>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <AuthNavigation />
        </SafeAreaView>
      </UserContext>
    </Provider>
  );
}

export default App;
