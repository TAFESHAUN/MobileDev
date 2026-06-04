import React from 'react';
import { View, ScrollView, StyleSheet, Alert, Platform } from 'react-native';
import { Text, TextInput, Button, List, IconButton, Divider, Searchbar } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppTheme } from '../App';

const STORAGE_KEY = 'cached_events';

export default function TestScreen() {
  const theme = useAppTheme();

  // State 
  const [events, setEvents]     = React.useState([]);
  const [titleText, setTitle]   = React.useState('');
  const [descText,  setDesc]    = React.useState('');
  const [editingId, setEditing] = React.useState(null); // Week 7

  // Search state
  const [searchQuery, setSearchQuery] = React.useState('');

  // Date picker state
  const [selectedDate, setSelectedDate]     = React.useState(new Date());
  const [showDatePicker, setShowDatePicker] = React.useState(false);

  // Load 
  React.useEffect(() => {
    loadLocalEvents();
  }, []);

  const loadLocalEvents = async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) setEvents(JSON.parse(raw));
    } catch (e) {
      console.error('Load failed:', e);
    }
  };

  // Filter events by title or date based on search query
  const filteredEvents = events.filter(e => {
    const q = searchQuery.toLowerCase();
    return (
      e.title.toLowerCase().includes(q) ||
      e.date.toLowerCase().includes(q)
    );
  });

  // Convert Date object to YYYY-MM-DD string for storage
  const formatDate = (date) => date.toISOString().split('T')[0];

  // Handle date picker selection
  const onDateChange = (event, date) => {
    setShowDatePicker(false); // hide picker after selection
    if (date) setSelectedDate(date);
  };

  // Create
  const addEvent = async () => {
    const title = titleText.trim();
    const desc  = descText.trim();

    if (!title) {
      Alert.alert('Validation', 'Title cannot be empty.');
      return;
    }

    // Unique id for event use timestamp, date comes from the date picker
    const newEvent = {
      id:          Date.now(),
      title,
      description: desc || 'No description',
      date:        formatDate(selectedDate), // use picked date instead of today
      location:    'Local Event',
      category:    'User Added',
    };

    const updated = [...events, newEvent];
    setEvents(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    setTitle('');
    setDesc('');
    setSelectedDate(new Date()); // reset date picker back to today
  };

  // Delete
  const deleteEvent = async (id) => {
    Alert.alert(
      'Delete Event',
      'Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const updated = events.filter(e => e.id !== id);
            setEvents(updated);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          },
        },
      ]
    );
  };

  // Update
  const startEdit = (event) => {
    setEditing(event.id);                              // remember which event we are editing
    setTitle(event.title);                             // pre-fill the title field
    setDesc(event.description);
    setSelectedDate(new Date(event.date + 'T00:00:00')); // pre-fill date picker
  };

  // Save event changes
  const saveEdit = async () => {
    const title = titleText.trim();
    const desc  = descText.trim();

    if (!title) {
      Alert.alert('Validation', 'Title cannot be empty.');
      return;
    }

    // Replace old with update, include the new picked date
    const updated = events.map(e =>
      e.id === editingId
        ? { ...e, title, description: desc || 'No description', date: formatDate(selectedDate) }
        : e
    );

    setEvents(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Reset form and exit edit mode
    setEditing(null);
    setTitle('');
    setDesc('');
    setSelectedDate(new Date());
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.test }]}>
      <Text variant='headlineMedium' style={[styles.title, { color: theme.titleColor }]}>
        Test Page 
      </Text>
      <Text variant='bodyMedium' style={{ color: '#313131', marginBottom: 16 }}>
        {events.length} event(s) in local storage
      </Text>

      {/* Search bar */}
      <Searchbar
        placeholder='Search by name or date...'
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchBar}
      />

      <Button
        mode='outlined'
        icon='calendar'
        onPress={() => setShowDatePicker(true)}
        style={styles.dateButton}
      >
        Date: {formatDate(selectedDate)}
      </Button>

      {/* showDatePicker is true */}
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode='date'
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={onDateChange}
        />
      )}

      <Divider style={{ marginVertical: 16 }} />

      {/* Form */}
      <TextInput
        label='Event Title'
        value={titleText}
        onChangeText={setTitle}
        mode='outlined'
        style={styles.input}
        maxLength={50}
      />
      <TextInput
        label='Description'
        value={descText}
        onChangeText={setDesc}
        mode='outlined'
        style={styles.input}
        maxLength={120}
      />

      <Button
        mode='contained'
        onPress={editingId ? saveEdit : addEvent}
        buttonColor={theme.accent}
        style={styles.addButton}
      >
        {editingId ? 'Save Changes' : 'Add Event'}
      </Button>

      {/* Show cancel button when editing */}
      {editingId && (
        <Button
          mode='outlined'
          onPress={() => { setEditing(null); setTitle(''); setDesc(''); setSelectedDate(new Date()); }}
        >
          Cancel Edit
        </Button>
      )}

      <Divider style={{ marginVertical: 16 }} />

      {/* Show filter */}
      {filteredEvents.length === 0 && (
        <Text style={{ color: '#999', textAlign: 'center' }}>No events found.</Text>
      )}
      {filteredEvents.map((event, index) => (
        <View key={String(event.id)}>
          <List.Item
            title={event.title}
            description={event.date}
            right={() => (
              <View style={{ flexDirection: 'row' }}>
                <IconButton
                  icon='pencil-outline'
                  iconColor={theme.accent}
                  onPress={() => startEdit(event)}
                />
                <IconButton
                  icon='delete-outline'
                  iconColor='crimson'
                  onPress={() => deleteEvent(event.id)}
                />
              </View>
            )}
          />
          {index < filteredEvents.length - 1 && <Divider />}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:  { flex: 1, padding: 16 },
  title:      { fontWeight: 'bold', marginBottom: 8 },
  searchBar:  { marginBottom: 16 },
  input:      { marginBottom: 12 },
  dateButton: { marginBottom: 12 },
  addButton:  { marginBottom: 8 },
});