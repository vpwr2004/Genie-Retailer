import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const RequestLoader = () => {
  const opacity = new Animated.Value(0.5);

  Animated.loop(
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0.6,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0.4,
        duration: 800,
        useNativeDriver: true,
      }),
     
    ])
  ).start();

  return (
    <View style={styles.container}>
      
      <View style={[styles.messageSkeleton, styles.left]}>
        
        <View style={styles.text}>
          <Animated.View style={[styles.line2, styles.short, { opacity }]} />
        </View>
      </View>
      <View style={[styles.messageSkeleton, styles.left]}>
        
        <View style={styles.text}>
          <Animated.View style={[styles.line2, styles.short, { opacity }]} />
        </View>
      </View>
      <View style={[styles.messageSkeleton, styles.left]}>
        
        <View style={styles.text}>
          <Animated.View style={[styles.line2, styles.short, { opacity }]} />
        </View>
      </View>
      <View style={[styles.messageSkeleton, styles.left]}>
        <View style={styles.text}>
          <Animated.View style={[styles.line2, styles.short, { opacity }]} />
        </View>
      </View>
      <View style={[styles.messageSkeleton, styles.left]}>
        
        <View style={styles.text}>
          <Animated.View style={[styles.line2, styles.short, { opacity }]} />
        </View>
      </View>
     
     
      
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: '#f0f0f0',

    justifyContent: 'center',
   
  },
  messageSkeleton: {
    flexDirection: 'row',
    marginBottom: 10,
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
    height: 110,
    backgroundColor: '#ccc',
    marginBottom: 10,
    borderRadius: 16,
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

export default RequestLoader;