import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
    setQuery('');
  };

  const handleSubmit = (event) => {
    if (event.nativeEvent.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search events..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSubmit}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 16,
    marginTop: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#007AFF',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SearchBar;
