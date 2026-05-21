import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Switch, Divider, List } from 'react-native-paper';

// #TODO: Import ICONS when we do logo
export default function SettingsScreen() {
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Settings
      </Text>

      <List.Item
        title="Notifications"
        titleStyle={{color:'#000000'}}
        description={notificationsOn ? "NotifyOn" : "NotifyOff"}
        right = { () => (
          <Switch
            value ={notificationsOn}
            onValueChange={setNotificationsOn}
          />
        )}
      />

      <Divider />

      <List.Item 
        title= "Dark Mode"
        titleStyle={{color:'#c900a7'}}
        description={darkMode ? "On" : "Off"}
        right = { () => (
          <Switch
            value ={darkMode}
            onValueChange={setDarkMode}
          />
        )}
      />

      <Divider />

      <Text variant="bodyLarge" style={styles.body}>
        Add other cool settings TODO
      </Text>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: { marginBottom: 12, fontWeight: 'bold', color:'#8c61ef'},
  body:  { color: '#777' },
});
