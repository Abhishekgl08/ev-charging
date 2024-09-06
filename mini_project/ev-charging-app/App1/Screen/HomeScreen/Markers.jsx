import { View, Text, Image } from 'react-native'
import React, { useContext } from 'react'
import { Marker } from 'react-native-maps'
import Colors from '@/App1/Utils/Colors'
import { SelectMarkerContext } from '@/App1/Context/SelectMarkerContext'

export default function Markers({index,place}) {
    const {selectedMarker,setSelectedMarker}=useContext(SelectMarkerContext);
    return place && (
    <Marker
            coordinate={{
                latitude:place.location?.latitude,
                longitude:place.location?.longitude
                
            }}
            onPress={()=>setSelectedMarker(index)}
        >
            <Image source={require('./../../../assets/images/marker.png')}
            style={{width:45,height:50}}
            />
        </Marker>
  )
}

