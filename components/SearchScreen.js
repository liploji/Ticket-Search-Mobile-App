import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Loading from './parts/Loading';

const SearchScreen = () => {
  const { params } = useRoute();
  const { query } = params;
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${query}&countryCode=CA&city=Toronto&apikey=ndFD67AViBaQIzzYY9&size=20`
        );
        const data = await response.json();
        setSearchResults(data._embedded?.events || []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSearchResults();
  }, [query]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView style={styles.scrollContainer}>
          {searchResults.map((event) => (
            <TouchableOpacity
              key={event.id}
              style={styles.eventContainer}
              onPress={() => navigation.navigate('EventDetails', { event })}
            >
              <Image
                source={{ uri: event.images[2].url }}
                style={styles.eventImage}
                resizeMode="cover"
              />
              <View style={styles.eventDetails}>
                <Text style={styles.eventName}>{event.name}</Text>
                <Text style={styles.eventDate}>{event.dates.start.localDate}</Text>
                <Text style={styles.eventVenue}>
                  {event._embedded?.venues?.[0]?.name || 'N/A'}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
  },
  eventContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  eventImage: {
    width: '50%',
    height: 150,
    borderRadius: 8,
  },
  eventDetails: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  eventDate: {
    fontSize: 16,
    color: '#666',
  },
  eventVenue: {
    fontSize: 16,
    color: '#666',
  },
});

export default SearchScreen;
