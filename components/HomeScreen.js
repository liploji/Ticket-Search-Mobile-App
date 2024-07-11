import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, StyleSheet, TouchableHighlight, Text, Dimensions, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './parts/Loading';
import SearchBar from './parts/SearchBar';
import EventCard from './parts/EventCard';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [musicEvents, setMusicEvents] = useState([]);
  const [sportsEvents, setSportsEvents] = useState([]);
  const [artsEvents, setArtsEvents] = useState([]);
  const [otherEvents, setOtherEvents] = useState([]);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const fetchEvents = async (categoryId, size) => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=CA&city=Toronto&classificationId=${categoryId}&size=${size}&apikey=ndFD67AViBaQIzzYY9bCQ0zHCj3PiOFz`
        );
        const data = await response.json();
        return data._embedded.events;
      } catch (error) {
        console.error(error);
        return [];
      } finally {
        setIsLoading(false);
      }
    };

    const fetchMusicEvents = async () => {
      const events = await fetchEvents('KZFzniwnSyZfZ7v7nJ', 10);
      setMusicEvents(events);
    };

    const fetchSportsEvents = async () => {
      const events = await fetchEvents('KZFzniwnSyZfZ7v7n1', 10);
      setSportsEvents(events);
    };

    const fetchArtsEvents = async () => {
      const events = await fetchEvents('KZFzniwnSyZfZ7v7na', 10);
      setArtsEvents(events);
    };

    const fetchOtherEvents = async () => {
      const events = await fetchEvents('KZFzniwnSyZfZ7v7n1', 10);
      setOtherEvents(events);
    };

    fetchMusicEvents();
    fetchSportsEvents();
    fetchArtsEvents();
    fetchOtherEvents();
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    dispatch({ type: 'LOGOUT_USER' });
    navigation.navigate('Home');
  }, [dispatch, navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if (user) {
          return (
            <TouchableHighlight
              onPress={handleLogout}
              style={styles.logoutButton}
            >
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableHighlight>
          );
        } else {
          return (
            <TouchableHighlight
              onPress={() => navigation.navigate('Login')}
              style={styles.loginButton}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableHighlight>
          );
        }
      },
      headerTitle: user ? `Welcome, ${user.name}!` : 'Home',
      headerStyle: {
        height: 70,
      },
      onLayout: (event) => {
        setHeaderHeight(event.nativeEvent.layout.height);
      },
    });
  }, [navigation, user, handleLogout]);

  const handleSearch = (query) => {
    navigation.navigate('Search', { query });
  };

  const handleEventPress = (event) => {
    navigation.navigate('EventDetails', { event });
  };

  const getMinPrice = (event) => {
    const { priceRanges } = event;
    if (priceRanges && priceRanges.length > 0 && priceRanges[0].min !== undefined) {
      return priceRanges[0].min;
    }
    return 0;
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView style={styles.contentContainer}>
          <View style={[styles.categoryContainer, { height: 300 }]}>
            <Text style={styles.categoryLabel}>Music Events</Text>
            <ScrollView
              horizontal
              style={[styles.scrollContainer, { height: '100%' }]}
              contentContainerStyle={styles.eventContainerWrapper}
            >
              {musicEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onPress={handleEventPress}
                  minPrice={getMinPrice(event)}
                />
              ))}
            </ScrollView>
          </View>
          <View style={[styles.categoryContainer, { height: 300 }]}>
            <Text style={styles.categoryLabel}>Sports Events</Text>
            <ScrollView
              horizontal
              style={[styles.scrollContainer, { height: '100%' }]}
              contentContainerStyle={styles.eventContainerWrapper}
            >
              {sportsEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onPress={handleEventPress}
                  minPrice={getMinPrice(event)}
                />
              ))}
            </ScrollView>
          </View>
          <View style={[styles.categoryContainer, { height: 300 }]}>
            <Text style={styles.categoryLabel}>Arts & Theatre Events</Text>
            <ScrollView
              horizontal
              style={[styles.scrollContainer, { height: '100%' }]}
              contentContainerStyle={styles.eventContainerWrapper}
            >
              {artsEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onPress={handleEventPress}
                  minPrice={getMinPrice(event)}
                />
              ))}
            </ScrollView>
          </View>
          <View style={[styles.categoryContainer, { height: 300 }]}>
            <Text style={styles.categoryLabel}>Other Events</Text>
            <ScrollView
              horizontal
              style={[styles.scrollContainer, { height: '100%' }]}
              contentContainerStyle={styles.eventContainerWrapper}
            >
              {otherEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onPress={handleEventPress}
                  minPrice={getMinPrice(event)}
                />
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
  },
  scrollContainer: {
    paddingTop: 16,
  },
  eventContainerWrapper: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  loginButton: {
    marginRight: 16,
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#007AFF',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutButton: {
    marginRight: 16,
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  categoryContainer: {
    marginVertical: 16,
  },
  categoryLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 8,
  },
});

export default HomeScreen;
