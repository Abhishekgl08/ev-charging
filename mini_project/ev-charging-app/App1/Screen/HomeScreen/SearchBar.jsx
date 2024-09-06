import { View, Text } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/App1/Utils/Colors';


export default function SearchBar({searchedLocation}) {
  return (
    <View style={{
      zindex:10,flex:0.5,
      display:'flex',
      flexDirection:'row',
      marginTop:5,
      paddingHorizontal:5,
      backgroundColor:Colors.WHITE,
      borderRadius:6
    }}>
      <Ionicons name='location-sharp' size={24}
      color={Colors.GRAY} style={{paddingTop:10}}/>
      <GooglePlacesAutocomplete
      placeholder='Search EV Charging station'
      fetchDetails={true}
      onPress={(data, details = null) => {
        searchedLocation(details?.geometry?.location)
      }}
      is
      query={{
        key:'AIzaSyDYTDUHvPzxlI0ooqzImd5ZoGwB7FIQUJo',
        language: 'en',
      }}
      onFail={error=>console.log(error)}
      
    />
    </View>
  )
}
