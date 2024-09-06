import {
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
  ToastAndroid,
  Linking,
  Platform,
} from "react-native";
import React from "react";
import Colors from "@/App1/Utils/Colors";
import GlobalApi from "@/App1/Utils/GlobalApi";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getFirestore } from "firebase/firestore";
import { app } from "../../Utils/FirebaseConfig";
import { doc, setDoc, deleteDoc  } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";

export default function PlaceItem({ place, isFav, markedFav }) {
  const PLACE_PHOTO_BASE_URL = "https://places.googleapis.com/v1/";
  const { user } = useUser();
  const db = getFirestore(app);
  const onSetFav = async () => {
    if (!place || !place.id) {
      console.error("Invalid place object or id is undefined");
      return; 
    }

    try {
     
      await setDoc(doc(db, "ev-favourite-place", place.id.toString()), {
        place: place,
        email: user?.primaryEmailAddress?.emailAddress,
      });
      markedFav();
      ToastAndroid.show("Favourite Added!", ToastAndroid.TOP);
    } catch (error) {
      console.error("Error adding favorite:", error);
      ToastAndroid.show("Failed to add favorite!", ToastAndroid.TOP);
    }
  };
  const onRemoveFav = async () => {
    if (!place || !place.id) {
      console.error("Invalid place object or id is undefined");
      return; 
    }

    try {
      // Firestore operation here
      await deleteDoc(doc(db, "ev-favourite-place", place.id.toString()), {
        place: place,
        email: user?.primaryEmailAddress?.emailAddress,
      });
     
      ToastAndroid.show("Favourite Removed!", ToastAndroid.TOP);
      markedFav();
    } catch (error) {
      console.error("Error removing favorite:", error);
      ToastAndroid.show("Failed to remove favorite!", ToastAndroid.TOP);
    }
  };
  
  const onDirectionClick = () => {
    let url = "";
    if (Platform.OS === "ios") {
      url = `maps://app?daddr=${place.location.latitude},${place.location.longitude}&dirflg=d&t=h`;
    } else if (Platform.OS === "android") {
      url = `geo:${place.location.latitude},${place.location.longitude}?q=${place.formattedAddress}`;
    }
  
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Cannot handle URL: ${url}`);
      }
    }).catch((error) => {
      console.error(`Failed to open URL: ${url}`, error);
    });
  };

  return (
    <View
      style={{
        backgroundColor: Colors.WHITE,
        margin: 4,
        borderRadius: 35,
        marginBottom: 1,
        // marginLeft:38,
        // marginRight:18,

        width: Dimensions.get("screen").width * 0.8,
      }}
    >
      <LinearGradient colors={["transparent", "#ffffff", "#ffff"]}>
        {!isFav? <Pressable
          style={{ position: "absolute", right: 0, margin: 5 }}
          onPress={() => onSetFav()}
        >
          <Ionicons name="heart-outline" size={30} color="white" />
        </Pressable>:

        <Pressable
          style={{ position: "absolute", right: 0, margin: 5 }}
          onPress={() => onRemoveFav(place.id)}
        >
          <Ionicons name="heart-sharp" size={30} color="red" />
        </Pressable>}
        <Image
          source={
            place?.photos
              ? {
                  uri:
                    PLACE_PHOTO_BASE_URL +
                    place?.photos[0]?.name +
                    "/media?key=" +
                    GlobalApi?.API_KEY +
                    "&maxHeightPx=800&maxWidthPx=1200",
                }
              : require("./../../../assets/images/ev-charging.jpg")
          }
          style={{
            width: "100%",
            borderRadius: 10,
            height: 150,
            zIndex: -1,
          }}
        />
        <View style={{ padding: 10 }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "600",
              marginLeft: 6,
            }}
          >
            {place.displayName?.text}
          </Text>
          <Text
            style={{
              color: Colors.GRAY,
              fontSize: 13,
              marginLeft: 6,
            }}
          >
            {place?.shortFormattedAddress}
          </Text>
          <View
            style={{
              marginTop: 5,
              marginLeft: 6,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={{
                  color: Colors.GRAY,
                }}
              >
                Connectors
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  marginTop: 2,
                  fontWeight: "500",
                }}
              >
                {place?.evChargeOptions?.connectorCount}
              </Text>
            </View>
            <Pressable
            onPress={()=>onDirectionClick()}
              style={{
                backgroundColor: Colors.PRIMARY,
                borderRadius: 8,
                padding: 10,
                paddingHorizontal: 18,
              }}
            >
              <FontAwesome name="location-arrow" size={25} color="white" />
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
