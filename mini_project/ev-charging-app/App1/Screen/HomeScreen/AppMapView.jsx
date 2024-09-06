import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useContext } from 'react';
import { UserLocationContext } from '@/App1/Context/UserLocationContext';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import MapViewStyle from './../../Utils/MapViewStyle.json'
import Markers from './../HomeScreen/Markers'
export default function AppMapView({placeList}) {
    const{location,setLocation}=useContext(UserLocationContext);
    return location?.latitude &&(
    <View>
       <MapView style={styles.map}
       provider={PROVIDER_GOOGLE}
       showsUserLocation={true} 
       customMapStyle={MapViewStyle}
       region={{
        latitude:location?.latitude,
        longitude:location?.longitude,
        latitudeDelta:0.0422,
        longitudeDelta:0.0421
       }}>
        {location ? <Marker
            coordinate={{
                latitude:location?.latitude,
                longitude:location?.longitude
                
            }}
        >
            <Image source={require('./../../../assets/images/car-marker.png')}
            style={{width:50,height:70}}
            />
        </Marker>:null}
        {placeList && placeList.map((item,index)=>(
          <Markers key={index}
          index={index}
          place={item}/>
        ))}
       </MapView>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });