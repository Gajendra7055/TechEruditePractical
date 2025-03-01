import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Event } from '../types/types';

const FavoritesScreen = () => {
  const favorites: any = useSelector((state: RootState) => state.favorites.items);
  console.log('favorites', favorites);

  if (favorites?.length <= 0) {
    return (
      <View style={styles.noDataContainer}>
        <Text>No Data Available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
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
                  <TouchableOpacity style={styles.favoriteButton}>
                    <Image
                      style={styles.actionIcon}
                      source={
                        favorites.some((fav: { id: any }) => fav.id === item.id)
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
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default FavoritesScreen;