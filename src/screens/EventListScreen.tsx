import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { getEvents } from '../api/events';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../features/favoritesSlice';
import { RootState } from '../store/store';
import { Event } from '../types/types';

interface Props {
  navigation: any;
}

const EventListScreen: React.FC<Props> = ({ navigation }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const favorites: any = useSelector((state: RootState) => state.favorites.items);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const response: any = await getEvents(token);
          setEvents(response.events);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleFavorite = (event: any) => {
    if (favorites.some((fav: { event_date_id: any }) => fav.event_date_id === event.event_date_id)) {
      dispatch(removeFromFavorites(event.event_date_id));
    } else {
      dispatch(addToFavorites(event));
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }: any) => (
          <View style={styles.eventItem}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.eventImage}
                source={{ uri: item.event_profile_img }}
              />
            </View>
            <View style={styles.eventDetails}>
              <View style={styles.eventHeader}>
                <Text style={styles.eventTitle}>{item.event_name}</Text>
                <TouchableOpacity>
                  <Image
                    style={styles.backIcon}
                    source={require('../assets/images/backIcon.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.dateLocationContainer}>
                <Text style={styles.dateText}>{item.readable_from_date}</Text>
                <Text style={styles.locationText}>
                  {item.city}, {item.country}
                </Text>
              </View>
              <Text style={styles.priceText}>
                €{item.event_price_from} - €{item.event_price_to}
              </Text>
              <View style={styles.keywordsContainer}>
                <View style={styles.keywordsList}>
                  {item.keywords.map((keyword: any, index: number) => (
                    <View key={index} style={styles.keywordItem}>
                      <Text style={styles.keywordText}>{keyword}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.actionsContainer}>
                  <TouchableOpacity>
                    <Image
                      style={styles.actionIcon}
                      source={require('../assets/images/share.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={() => handleFavorite(item)}
                  >
                    <Image
                      style={styles.actionIcon}
                      source={
                        favorites.some((fav: { event_date_id: any }) => fav.event_date_id === item.event_date_id)
                          ? require('../assets/images/vector.png')
                          : require('../assets/images/heart_outline.png')
                      }
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  eventItem: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 10,
  },
  imageContainer: {
    borderRadius: 4,
  },
  eventImage: {
    height: 60,
    width: 60,
    borderRadius: 4,
  },
  eventDetails: {
    flex: 1,
    paddingHorizontal: 5,
  },
  eventHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  backIcon: {
    height: 14,
    width: 14,
    resizeMode: 'contain',
  },
  dateLocationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateText: {
    color: '#34A853',
    fontSize: 12,
  },
  locationText: {
    color: '#828282',
    fontSize: 11,
  },
  priceText: {
    color: '#828282',
    fontSize: 11,
  },
  keywordsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  keywordsList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  keywordItem: {
    backgroundColor: '#F5F7FC',
    borderRadius: 5,
    marginRight: 5,
    padding: 5,
  },
  keywordText: {
    fontSize: 12,
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  actionIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  favoriteButton: {
    marginLeft: 10,
  },
});

export default EventListScreen;