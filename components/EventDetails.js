import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, Text, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const EventDetails = () => {
  const { params } = useRoute();
  const { event } = params;
  const navigation = useNavigation();
  const [ticketCount, setTicketCount] = useState(1);
  const [priceType, setPriceType] = useState('min');
  const user = useSelector((state) => state.user);

  const handleTicketCountChange = (delta) => {
    const newCount = ticketCount + delta;
    const ticketLimit = event.accessibility?.ticketLimit || 0;

    if (newCount < 1) {
      return;
    }

    if (ticketLimit > 0 && newCount > ticketLimit) {
      Alert.alert(
        'Ticket Limit Reached',
        `This event has a ticket limit of ${ticketLimit} per order.`,
        [{ text: 'OK' }]
      );
      return;
    }

    setTicketCount(newCount);
  };

  const handleBuyTickets = () => {
    if (!user) {
      navigation.navigate('Login');
    } else {
      navigation.navigate('Checkout', {
        event,
        ticketCount,
        priceType,
      });
    }
  };

  const getEventPrice = () => {
    const { priceRanges } = event;
    if (priceRanges && priceRanges.length > 0) {
      const minPrice = priceRanges[0].min;
      const maxPrice = priceRanges[0].max;
      return { min: minPrice, max: maxPrice };
    }
    return { min: 'N/A', max: 'N/A' };
  };

  const { min, max } = getEventPrice();
  const ticketLimit = event.accessibility?.ticketLimit || 0;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: event.images[2].url }} style={styles.eventImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.eventName}>{event.name}</Text>
        <Text style={styles.eventDate}>{event.dates.start.localDate}</Text>
        <Text style={styles.eventVenue}>{event._embedded.venues[0].name}</Text>
        <View style={styles.ticketContainer}>
          <Text style={styles.ticketLabel}>Tickets:</Text>
          <View style={styles.ticketCountContainer}>
            <TouchableOpacity
              style={styles.ticketCountButton}
              onPress={() => handleTicketCountChange(-1)}
            >
              <Text style={styles.ticketCountButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.ticketCountText}>{ticketCount}</Text>
            <TouchableOpacity
              style={styles.ticketCountButton}
              onPress={() => handleTicketCountChange(1)}
            >
              <Text style={styles.ticketCountButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.priceTypeContainer}>
          <Text style={styles.priceTypeLabel}>Price Type:</Text>
          <TouchableHighlight
            style={[
              styles.priceTypeButton,
              priceType === 'min' ? styles.selectedPriceTypeButton : null,
            ]}
            onPress={() => setPriceType('min')}
          >
            <Text style={styles.priceTypeButtonText}>${min}</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[
              styles.priceTypeButton,
              priceType === 'max' ? styles.selectedPriceTypeButton : null,
            ]}
            onPress={() => setPriceType('max')}
          >
            <Text style={styles.priceTypeButtonText}>${max}</Text>
          </TouchableHighlight>
        </View>
        <TouchableOpacity style={styles.buyButton} onPress={handleBuyTickets}>
          <Text style={styles.buyButtonText}>Buy Tickets</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  eventImage: {
    width: '100%',
    height: 300,
  },
  detailsContainer: {
    padding: 16,
  },
  eventName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  eventDate: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  eventVenue: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  ticketContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ticketLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  ticketCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ticketCountButton: {
    backgroundColor: '#007AFF',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  ticketCountButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  ticketCountText: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  priceTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceTypeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  priceTypeButton: {
    backgroundColor: '#f2f2f2',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  selectedPriceTypeButton: {
    backgroundColor: '#007AFF',
  },
  priceTypeButtonText: {
    color: '#333',
    fontSize: 16,
  },
  buyButton: {
    backgroundColor: '#007AFF',
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EventDetails;
