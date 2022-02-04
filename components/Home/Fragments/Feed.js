import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Text,
  FlatList,
  View,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';

import FeedItem from './FeedItem';
import { getData } from '../../../api/api';
import { useConnection } from '../../../connection/ConnectionProvider';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});

const Feed = () => {
  const [feed, setFeed] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isConnected } = useConnection();

  const storeFeed = useCallback(async (data) => {
    try {
      await AsyncStorage.setItem(
        'feed',
        JSON.stringify(data),
      );
    } catch (error) {
      alert(error);
    }
  }, []);

  const getStoredFeed = useCallback(async () => {
    try {
      const storedFeed = await AsyncStorage.getItem('feed') || [];

      setFeed(JSON.parse(storedFeed));
    } catch (error) {
      alert(error);
    }
  }, []);

  const handleData = useCallback(async () => {
    setIsLoading(true);

    const data = await getData();

    setFeed(data);

    await storeFeed(data);

    setIsLoading(false);
  }, []);

  useEffect(() => {
    (async () => {
      await getStoredFeed();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (isConnected) {
        await handleData();
      }
    })();
  }, [isConnected]);

  const handleRefresh = useCallback(async () => {
    if (isConnected) {
      await handleData();
    }

    return;
  }, [handleData, isConnected]);

  const renderItem = useCallback(({ item }) => (
    <FeedItem
      imgUrl={item.source}
      title={item.title}
      initialLikes={item.likes}
    />
  ), []);

  const renderList = useMemo(() => (
    <FlatList
      contentContainerStyle={styles.container}
      ListEmptyComponent={
        <View>
          <Text>Nothing to see here !</Text>
        </View>
      }
      reverted={true}
      data={feed}
      onRefresh={handleRefresh}
      refreshing={isLoading}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  ), [feed, isLoading]);

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size={'large'} color={'#0000ff'} />
      </View>
    );
  }

  return renderList;
};

export default Feed;
