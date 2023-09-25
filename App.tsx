import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AuthNavigation from './src/navigation/AuthNavigation';
import {Provider} from 'react-redux';
import {store} from './src/utilis/redux/Store';
import {UserContext} from './src/utilis/context/UserContext';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
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
