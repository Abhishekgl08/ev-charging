import { View, Text, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/App1/Utils/Colors";
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import { app } from "@/App1/Utils/FirebaseConfig";
import PlaceItem from "../HomeScreen/PlaceItem";

export default function FavouriteScreen() {
  const db = getFirestore(app);
  const { user } = useUser();
  const [favList, setFavList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      getFav();
    }
  }, [user]);

  const getFav = async () => {
    setLoading(true)
    setFavList([]);
    const q = query(
      collection(db, "ev-favourite-place"),
      where("email", "==", user?.primaryEmailAddress?.emailAddress)
    );

    const querySnapshot = await getDocs(q);
    const favorites = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      favorites.push(doc.data());
    });
    setFavList(favorites);
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={"large"} color={Colors.PRIMARY} />
        <Text style={{ marginTop: 5 }}>Loading....</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>
        My Favourite<Text style={{ color: Colors.PRIMARY }}> Places</Text>
      </Text>
      {favList.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={"large"} color={Colors.PRIMARY} />
          <Text style={{ marginTop: 5 }}>Loading....</Text>
        </View>
      ) : null}
      <FlatList
        data={favList}
        onRefresh={() => getFav()}
        refreshing={loading}
        renderItem={({ item }) => (
          <PlaceItem place={item.place} isFav={true} markedFav={() => getFav()} />
        )}
        keyExtractor={(item) => item.place.id.toString()}
        contentContainerStyle={styles.flatListContentContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    padding: 10,
    fontWeight: '800',
    fontSize: 30,
    textAlign: 'center', // Center-align the title
  },
  flatListContentContainer: {
    paddingBottom: 20,
    alignItems: 'center', // Center-align the FlatList content
  },
});