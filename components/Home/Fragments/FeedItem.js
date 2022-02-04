import React, { useCallback, useMemo, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  picture: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  text: {
    textAlign: 'center',
    marginBottom: 20,
  },
  thumbContainer: {
    alignSelf: 'flex-end',
  },
  thumb: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  likes: {
    marginLeft: 5,
  },
});

const FeedItem = ({
  imgUrl,
  title,
  initialLikes,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const navigation = useNavigation();

  const handleLike = useCallback(() => {
    setIsLiked(true);
    setLikes(likes + 1);
  }, [setIsLiked, setLikes, likes]);

  const handleDislike = useCallback(() => {
    setIsLiked(false);
    setLikes(likes - 1);
  }, [setIsLiked, setLikes, likes]);

  const renderThumbs = useMemo(() => {
    if (isLiked) {
      return (
        <TouchableOpacity
          style={styles.thumb}
          onPress={handleDislike}
        >
          <MaterialCommunityIcons name='thumb-up' size={30} />
          <Text style={styles.likes}>{likes}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={styles.thumb}
        onPress={handleLike}
      >
        <MaterialCommunityIcons name='thumb-up-outline' size={30} />
        <Text style={styles.likes}>{likes}</Text>
      </TouchableOpacity>
    );
  }, [isLiked, likes, handleLike, handleDislike]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.push('Detail', {
            imgUrl: imgUrl,
            title: title,
          });
        }}>
        <Image
          style={styles.picture}
          source={{ uri: imgUrl }}
        />
      </TouchableOpacity>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.thumbContainer}>
        {renderThumbs}
      </View>
    </View>
  );
};

export default FeedItem;
