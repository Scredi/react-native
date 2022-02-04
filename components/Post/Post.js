import React, { useMemo, useState } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  TextInput,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useCallback, useEffect } from 'react/cjs/react.development';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { postData } from '../../api/api';
import { useConnection } from '../../connection/ConnectionProvider';

const styles = StyleSheet.create({
  picture: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
  input: {
    border: 1,
    padding: 5,
    borderWidth: 1,
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 10,
    flex: 0,
    textAlign: 'center',
    width: 70,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  submit: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

const Post = () => {
  const [base64, setBase64] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState('');
  const { isConnected } = useConnection();

  const handleCamera = useCallback(() => {
    const options = {
      includeBase64: true,
      mediaType: 'photo',
    };

    return launchImageLibrary(options, (response) => {
      const { assets } = response;
      
      if (assets && assets.length > 0) {
        setPreview(assets[0].uri);
        setBase64(`data:${assets[0].type};base64,${assets[0].base64}`);
      }
    });
  }, []);

  const handleChange = useCallback((e) => (
    setTitle(e)
  ), []);

  const handleSubmit = useCallback(async () => (
    await postData({
      source: base64,
      userToken: 'RTTGLFbDP3qLWK3z4B7FxbugGCRTAW',
      title,
    })
  ), [base64, title]);
  
  const renderPost = useMemo(() => {
    if (isConnected) {
      
      if (preview) {
        return (
          <View>
            <Image
              resizeMode={'cover'}
              resizeMethod={'scale'}
              style={styles.picture}
              source={{ uri: preview }}
            />
            <TextInput
              style={styles.input}
              onChangeText={handleChange}
              value={title}
              placeholder={'Say something about that'}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
            >
              <Text style={styles.submit}>Send</Text>
            </TouchableOpacity>
          </View>
        );
      }

      return (
        <TouchableOpacity
          style={styles.share}
          onPress={handleCamera}
        >
          <MaterialCommunityIcons name='camera' size={100} />
          <Text style={styles.text}>Select an image</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View>
        <Text>
          You need internet to share a post...
        </Text>
      </View>
    );
  }, [handleCamera, preview, title, handleSubmit, isConnected]);

  return (
    <SafeAreaView style={styles.container}>
      {renderPost}
    </SafeAreaView>
  );
};

export default Post;
