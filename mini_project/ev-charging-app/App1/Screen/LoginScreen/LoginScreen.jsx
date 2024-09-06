import {View, Text,Image,StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import Colors from './../../Utils/Colors'
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '@/hooks/hooks/useWarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';


WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen(){
    useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const onPress=async()=>{
    try {
        const { createdSessionId, signIn, signUp, setActive } =
          await startOAuthFlow();
  
        if (createdSessionId) {
          setActive({ session: createdSessionId });
        } else {
          // Use signIn or signUp for next steps such as MFA
        }
      } catch (err) {
        console.error("OAuth error", err);
      }
  }
    return(
        <View style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            marginTop:40
        }}>
            <Image source={require('./../../../assets/images/logo2.png')}
            style={styles.logoImage}

            />
            <Image source={require('./../../../assets/images/ev-charging.jpg')}
            style={styles.bgImage}
            />

            <View style={{padding:20}}>
                <Text style={styles.heading}>Your Ultimate EV Charging Spot Locator App</Text>
                <Text style={styles.subheading}>Find EV charging Station near you, plan trip and so much more in just one click!</Text>
                <TouchableOpacity style={styles.button}
                onPress={onPress}>
                    <Text style={{
                        color:Colors.WHITE,
                        textAlign:'center',
                        fontSize:17
                    }}>Login With Google</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    logoImage:{
        width:800,
        height:60,
        objectFit:'contain'
    },
    bgImage:{
        width:'100%',
        height:240,
        marginTop:20,
        objectFit:'cover'
    },
    heading:{
        fontSize:25,
        fontWeight: 'bold',
        textAlign:'center',
        marginTop:10
    },
    subheading:{
        fontSize:17,
        marginTop:15,
        textAlign:'center',
        color:'#000',
        color:Colors.GRAY

    },
    button:{
        backgroundColor:'#53b046',
        padding:16,
        display:'flex',
        borderRadius:99,
        marginTop:20

    }
})
