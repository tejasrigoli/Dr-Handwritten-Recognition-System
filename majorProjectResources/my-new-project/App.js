import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import UploadScreen from './src/UploadScreen';
import AddImage from './src/AddImage';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle = 'dark-content'/>
      {/* <UploadScreen /> */}
      <AddImage/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

