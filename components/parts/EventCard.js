import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, Dimensions } from 'react-native';

const EventCard = ({ event, onPress, minPrice }) => {
  return (
    <TouchableOpacity
      style={styles.eventContainer}
      onPress={() => onPress(event)}
    >
      <Image
        source={{ uri: event.images[2].url }}
        style={styles.eventImage}
        resizeMode="cover"
      />
      <View style={[styles.eventDetails, styles.detailsBackground]}>
        <Text style={styles.eventName} numberOfLines={2}>
          {event.name}
        </Text>
        <Text style={styles.eventDate}>From ${minPrice.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  eventContainer: {
    width: (Dimensions.get('window').width - 48) / 2,
    marginHorizontal: 8,
    marginVertical: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  eventDetails: {
    padding: 12,
    justifyContent: 'center',
  },
  detailsBackground: {
    backgroundColor: 'rgba(238, 238, 238, 0.8)',
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  eventDate: {
    fontSize: 14,
    color: '#666',
  },
});

export default EventCard;
