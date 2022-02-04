import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Text,
  FlatList,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import FeedItem from './FeedItem';
import { getData } from '../../../api/api';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});

const Feed = () => {
  const [feed, setFeed] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getData();
      setFeed(data);
      setIsLoading(false);
    })();
  }, []);

  const handleRefresh = useCallback(async () => {
    const data = await getData();
    setFeed(data);
    setIsLoading(true);
  }, [setIsLoading, setFeed]);

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
      data={feed}
      extraData={isLoading}
      onRefresh={() => handleRefresh}
      refreshing={isLoading}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  ), [feed]);

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
