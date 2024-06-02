

import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Loader = () => {
  return (
    <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#fb8c00" />
  </View>
  )
}

export default Loader

const styles = StyleSheet.create({
    loadingContainer: {
        ...StyleSheet.absoluteFill,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
})