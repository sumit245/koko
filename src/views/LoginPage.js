import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image
} from "react-native";
import KOKO from '../images/KOKO.png'

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginCheck = useCallback(() => {
    fetch('http://136.232.171.250:5000/android/mbl-logn/', {
      method: 'post',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({

        email: email,
        password: password,
      })
    })
    .then(response => response.json())
      .then(responseJson => {
        if (responseJson.message == "User Logged In") {

          alert(responseJson.message);

          navigation.navigate("HomePage");
        } else {
          alert(responseJson.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [email, password])
  return (
    <View style={styles.container}>
      <Image source={KOKO} style={{height:200,width:200}}/>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Mobile Number"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      {/* <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="OTP"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View> */}

      {/* <TouchableOpacity>
        <Text style={styles.forgot_button}>Resend OTP in 0:59s</Text>
      </TouchableOpacity> */}

      <TouchableOpacity style={[styles.loginBtn,{marginTop:-10}]} onPress={loginCheck} >
        <Text style={styles.loginText}>Send OTP</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity>
        <Text style={styles.forgot_button}>or</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.loginBtn,{marginTop:-25}]} onPress={loginCheck} >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    // backgroundColor: "#FFC0CB",
    borderWidth: 2,
    borderRadius: 10,
    width: "90%",
    height: 45,
    marginBottom: 20,

    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    textAlign: 'left'
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: "90%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "rgb(0,175,239)",
  },
  loginText: {
    color: '#ffffff'

  }

});