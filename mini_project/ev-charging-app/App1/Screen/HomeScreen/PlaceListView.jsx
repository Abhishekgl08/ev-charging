import { View, Text, FlatList, Dimensions } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import PlaceItem from './PlaceItem';
import { SelectMarkerContext } from '@/App1/Context/SelectMarkerContext';
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import { useUser } from '@clerk/clerk-expo';
import { app} from '../../Utils/FirebaseConfig'
export default function PlaceListView({ placeList }) {
    console.log("****", placeList);
    const flatListRef = useRef(null);

    const {user}=useUser();
    const[favlist,setfavList]=useState([]);
    const { selectedMarker, setSelectedMarker } = useContext(SelectMarkerContext);

    useEffect(() => {
        if (selectedMarker !== null && selectedMarker >= 0 && selectedMarker < placeList.length) {
            scrollToIndex(selectedMarker);
        } else {
            console.warn("Selected marker index out of range:", selectedMarker);
        }
    }, [selectedMarker]);

    const scrollToIndex = (index) => {
        flatListRef.current?.scrollToIndex({ animated: true, index });
    };

    const getItemLayout = (_, index) => ({
        length: Dimensions.get('window').width,
        offset: Dimensions.get('window').width * index,
        index
    });

    const db = getFirestore(app);

    useEffect(()=>{
        user&&getFav();
    },[user])

    const getFav=async()=>{
        setfavList([])
        const q = query(collection(db, "ev-favourite-place"), where("email", "==", user?.primaryEmailAddress?.emailAddress));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setfavList(favlist=>[...favlist,doc.data()]);
    });
}

const isFav=(place)=>{
    const result=favlist.find(item=>item.place.id==place.id);
    console.log(result)
    return result?true:false;
}


    return (
        <View>
            <FlatList
                data={placeList}
                horizontal={true}
                // pagingEnabled
                ref={flatListRef}
                getItemLayout={getItemLayout}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <View key={index}>
                        <PlaceItem place={item}
                        isFav={isFav(item)}
                        markedFav={()=>getFav()} />
                    </View>
                )}
            />
        </View>
    );
}
