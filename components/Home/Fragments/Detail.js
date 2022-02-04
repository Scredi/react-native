import React, { useCallback } from 'react';
import { View, Image, StyleSheet, Share, TouchableOpacity, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  picture: {
    width: '100%',
    height: 600,
    resizeMode: 'contain',
  },
  share: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const Detail = () => {
  const route = useRoute();
  const { params: { imgUrl, title } } = route;

  const handleShare = useCallback(async () => {
    try {
      const result = await Share.share({
        message: title,
      });
      
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imgUrl }}
        style={styles.picture}
      />
      <TouchableOpacity
        style={styles.share}
        onPress={handleShare}
      >
        <MaterialCommunityIcons name='share' size={30} />
        <Text>Share</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Detail;
