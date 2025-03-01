import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import {login} from '../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


interface Props {
  navigation: any;
}

const {height, width} = Dimensions.get('screen');
const LoginScreen: React.FC<Props> = ({navigation}) => {
  console.log('gdgdf');

  const [email, setEmail] = useState('testpracticaluser001@mailinator.com');
  const [password, setPassword] = useState('Test@123');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      console.log('Login Response:', response.data.token);

      if (response && response.data?.token) {
        await AsyncStorage.setItem('token', response.data.token);
        // navigation.navigate('EventList');
        navigation.navigate('Main');
      } else {
        Alert.alert('Error', 'Token not found in response');
      }
    } catch (error) {
      console.error('Login Error:', error); // Log the error
      Alert.alert('Error', 'Invalid email or password');
    }
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          <View style={styles.imageView}>
            <Image
              style={styles.logo}
              source={require('../assets/images/Plie.png')}
            />
            <Image
              style={styles.logo}
              source={require('../assets/images/icon.png')}
            />
          </View>
        </View>
        <View style={{backgroundColor: 'white', flex: 2}}>
          <View style={{marginHorizontal: 40, marginTop: 30}}>
            <Text style={styles.textLabel}>Email</Text>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            <Text style={styles.textLabel}>Password</Text>
            <View style={{flexDirection:'row'}}>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={styles.input}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
            <Icon
                name={showPassword ? 'eye' : 'eye-slash'}
                size={18}
                style={{right:40,top:8}}
              />
            </TouchableOpacity>
            
              </View>
            <TouchableOpacity style={{alignSelf: 'flex-end'}}>
              <Text style={{fontSize: 10}}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#21D393',
                alignSelf: 'flex-end',
                paddingHorizontal: 20,
                paddingVertical: 5,
                marginTop: 20,
                borderRadius: 4,
              }}
              onPress={handleLogin}>
              <Text style={{color: 'white'}}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignSelf: 'flex-end', top: 15}}>
              <Text style={{fontSize: 10}}>
                Not a member?
                <Text style={{textDecorationLine: 'underline'}}>
                  Sign Up Here
                </Text>
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
                marginTop: 80,
              }}>
              <View style={styles.line} />
              <Text
                style={{
                  marginHorizontal: 5,
                  alignItems: 'center',
                  fontSize: 12,
                }}>
                or sign in with:
              </Text>
              <View style={styles.line} />
            </View>
            <View style={{flexDirection: 'row',marginTop:40,justifyContent:'center'}}>
              <TouchableOpacity > 
                <Image
                  style={styles.brandlogo}
                  source={require('../assets/images/googlelogo.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={styles.brandlogo}
                  source={require('../assets/images/applelogo.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={styles.brandlogo}
                  source={require('../assets/images/facebooklogo.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
  },
  imageContainer: {
    backgroundColor: '#DADADA',
    flex: 1,
  },
  imageView: {
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: 50,
  },
  textLabel: {
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },
  input: {
    width: '100%',
    height: 35,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 10,
  },
  logo: {
    width: width * 0.26,
    height: height * 0.05,
    justifyContent: 'center',
    alignSelf: 'center',
    //
    resizeMode: 'contain',
    // flex:1
  },
  brandlogo: {
    width: width * 0.16,
    height: height * 0.05,
    justifyContent: 'center',
    alignSelf: 'center',
    // backgroundColor:'green',
    //
    resizeMode: 'contain',
    // flex:1
  },
});

export default LoginScreen;
