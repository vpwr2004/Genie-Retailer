import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const MapScreen = ({ route }) => {
  const [userLocation, setUserLocation] = useState(route.params.loc);

  useEffect(() => {
    const { loc } = route.params;
    setUserLocation(loc);
  }, [route.params]);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: userLocation ? userLocation.latitude : 0,
          longitude: userLocation ? userLocation.longitude : 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType='hybrid'
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        showsScale={true}
        zoomControlEnabled={true}
        zoomEnabled={true}
        rotateEnabled={true}
        scrollEnabled={true}
        pitchEnabled={true}
        toolbarEnabled={true}
        loadingEnabled={true}
        moveOnMarkerPress={true}
        legalLabelInsets={{ bottom: 100, right: 100 }}
        userLocationAnnotationTitle="Your Location"
        showsIndoors={true}
        showsIndoorLevelPicker={true}
        showsTraffic={true}
        showsBuildings={true}
        showsPointsOfInterest={true}
        showsScrollIndicators={true}
        showsZoomControls={true}
        showsLocationButton={true}
        showsMapTypeControl={true}
      >
        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="Your Location"
            description="You are here!"
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
