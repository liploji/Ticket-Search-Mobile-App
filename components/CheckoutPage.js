import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const CheckoutPage = () => {
  const { params } = useRoute();
  const handlingFee = 15;
  const { event, ticketCount, priceType } = params;
  const navigation = useNavigation();

  const getEventPrice = () => {
    const { priceRanges } = event;
    if (priceRanges && priceRanges.length > 0) {
      const price = priceType === 'min' ? priceRanges[0].min : priceRanges[0].max;
      return price;
    }
    return 0;
  };

  const handleCheckout = () => {
    const eventPrice = getEventPrice();
    const subTotal = eventPrice * ticketCount;
    const tax = subTotal * 0.13;
    const total = subTotal + tax + handlingFee;

    Alert.alert(
      'Thank you for your purchase!',
      `Enjoy the show! Your total is $${total.toFixed(2)}`,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home'),
        },
      ]
    );
  };

  const eventPrice = getEventPrice();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <View style={styles.orderSummary}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.summaryItem}>
          <Text style={styles.label}>Event:</Text>
          <Text style={styles.value}>{event.name}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.label}>Ticket Price:</Text>
          <Text style={styles.value}>${eventPrice.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.label}>Quantity:</Text>
          <Text style={styles.value}>{ticketCount}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.label}>Subtotal:</Text>
          <Text style={styles.value}>${(eventPrice * ticketCount).toFixed(2)}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.label}>Tax (13%):</Text>
          <Text style={styles.value}>${(eventPrice * ticketCount * 0.13).toFixed(2)}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.label}>Handling Fee:</Text>
          <Text style={styles.value}>${handlingFee.toFixed(2)}</Text>
        </View>
        <View style={[styles.summaryItem, styles.totalItem]}>
          <Text style={[styles.label, styles.totalLabel]}>Total:</Text>
          <Text style={[styles.value, styles.totalValue]}>${(eventPrice * ticketCount * 1.13 + handlingFee).toFixed(2)}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>Complete Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  orderSummary: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalItem: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 8,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#007AFF',
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
    padding: 5,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CheckoutPage;
