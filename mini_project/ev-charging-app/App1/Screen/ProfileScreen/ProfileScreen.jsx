import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Pressable, Animated, Easing } from 'react-native';
import { useUser, useAuth } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons from Expo

export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const navigation = useNavigation();
  const [showSupportNumbers, setShowSupportNumbers] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false);

  const animation = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
      });
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const toggleSupportNumbers = () => {
    setShowSupportNumbers(!showSupportNumbers);
    setShowEmail(false); 
    setShowAboutUs(false);
  };

  const toggleEmailVisibility = () => {
    setShowEmail(!showEmail);
    setShowAboutUs(false);
  };

  const toggleAboutUs = () => {
    setShowAboutUs(!showAboutUs);
    setShowEmail(false); 
    setShowSupportNumbers(false);
  };

  const fadeIn = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <LinearGradient
      colors={['#0BC224', '#303030']} // Darker green and grey
      style={styles.container}
    >
      <Animated.View style={[styles.topSection, { opacity: fadeIn }]}>
        <Image
          source={{ uri: user?.imageUrl }}
          style={styles.userImage}
        />
        <Text style={styles.userName}>{user?.fullName}</Text>
      </Animated.View>

      <Animated.View style={[styles.settingsContainer, { opacity: fadeIn }]}>
        <Pressable style={styles.settingButton} onPress={toggleEmailVisibility}>
          <Text style={styles.settingText}><MaterialIcons name="email" size={20} color="#333333" /> Email Address</Text>
        </Pressable>
        {showEmail && (
          <View style={styles.sectionContent}>
            <Text style={styles.sectionText}>
              {user?.primaryEmailAddress?.emailAddress}
            </Text>
          </View>
        )}

        <Pressable style={styles.settingButton} onPress={toggleAboutUs}>
          <Text style={styles.settingText}><MaterialIcons name="info" size={20} color="#333333" /> About Us</Text>
        </Pressable>
        {showAboutUs && (
          <View style={styles.sectionContent}>
            <Text style={styles.sectionText}>
              Discover a seamless experience with our app - your gateway to convenience and innovation.
              Created by Chandana S J and Abhishek G L.
            </Text>
          </View>
        )}

        <Pressable style={styles.settingButton} onPress={toggleSupportNumbers}>
          <Text style={styles.settingText}><MaterialIcons name="support" size={20} color="#333333" /> Support</Text>
        </Pressable>
        {showSupportNumbers && (
          <View style={styles.supportDropdown}>
            <Text style={styles.supportLabel}>Customer Support Numbers:</Text>
            <Text style={styles.supportNumber}>8073 658 599</Text>
            <Text style={styles.supportNumber}>7899 434 664</Text>
          </View>
        )}

        <Pressable style={styles.settingButton} onPress={handleLogout}>
          <Text style={styles.settingText}><MaterialIcons name="logout" size={20} color="#333333" /> Sign Out</Text>
        </Pressable>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  topSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 60,
    marginBottom: 20,
    borderColor: '#fff',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  userName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  settingsContainer: {
    backgroundColor: '#F0F0F0',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  settingButton: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 18,
    color: '#333333',
    fontWeight: '600',
  },
  sectionContent: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#EAEAEA',
    borderRadius: 10,
  },
  sectionText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333333',
  },
  supportDropdown: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#EAEAEA',
    borderRadius: 10,
  },
  supportLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333333',
  },
  supportNumber: {
    fontSize: 16,
    marginBottom: 3,
    color: '#333333',
  },
});
