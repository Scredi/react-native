import React, { useEffect, useMemo, useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import { getData } from '../../api/api';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  text: {
    fontSize: 50,
    fontWeight: 'bold',
  },
});

const Settings = () => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getData();
      setUsername(data[0].username);
      setIsLoading(false);
    })();
  }, []);

  const renderUsername = useMemo(() => (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.text}>{username}</Text>
      </View>
    </SafeAreaView>
  ), [username]);

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size={'large'} color={'#0000ff'} />
      </View>
    );
  }

  return renderUsername;
};

export default Settings;
