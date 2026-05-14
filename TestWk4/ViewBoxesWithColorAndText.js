import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const ViewBoxesWithColorAndText = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', height: 300 }}>
          <View style={{ height: 100, backgroundColor: 'blue', flex: 0.2 }} />
          <View style={{ height: 100, backgroundColor: 'red', flex: 0.4 }} />
          <View style={{ height: 150, backgroundColor: 'pink', flex: 0.9 }} />
          <View style={{ height: 100, backgroundColor: 'red', flex: 0.4 }} />
          <View style={{ height: 100, backgroundColor: 'black', flex: 0.2 }} />
          <View style={{ height: 100, backgroundColor: 'green', flex: 0.4 }} />
        </View>
        <Text>Hello World!</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ViewBoxesWithColorAndText;
