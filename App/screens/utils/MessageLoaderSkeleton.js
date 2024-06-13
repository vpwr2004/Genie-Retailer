import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const MessageLoaderSkeleton = () => {
  const opacity = new Animated.Value(0.3);

  Animated.loop(
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0.3,
        duration: 800,
        useNativeDriver: true,
      }),
    ])
  ).start();

  return (
    <View style={styles.container}>
      
      <View style={[styles.messageSkeleton, styles.left]}>
        <Animated.View style={[styles.avatar, { opacity }]} />
        <View style={styles.text}>
          <Animated.View style={[styles.line, styles.short, { opacity }]} />
          <Animated.View style={[styles.line, styles.short, { opacity }]} />
          <Animated.View style={[styles.line2, styles.short, { opacity }]} />
          <Animated.View style={[styles.line, styles.short, { opacity }]} />
        </View>
      </View>
      <View style={[styles.messageSkeleton, styles.right]}>
        <Animated.View style={[styles.avatar, { opacity }]} />
        <View style={styles.text}>
          <Animated.View style={[styles.line3, styles.short, { opacity }]} />
        </View>
      </View>
      
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    padding: 20,
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'center',
    zIndex:1
  },
  messageSkeleton: {
    flexDirection: 'row',
    marginBottom: 20,
    width: '100%',
  },
  left: {
    alignSelf: "flex-start",
  },
  right: {
    alignSelf: "flex-end",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  text: {
    flex: 1,
  },
  line: {
    height: 10,
    backgroundColor: '#ccc',
    marginBottom: 10,
    borderRadius: 4,
  },
  line2: {
    height: 70,
    backgroundColor: '#ccc',
    marginBottom: 10,
    borderRadius: 4,
  },
  line3: {
    height: 30,
    backgroundColor: '#ccc',
    marginBottom: 10,
    borderRadius: 4,
  },
  short: {
    width: '100%',
  },
});

export default MessageLoaderSkeleton;