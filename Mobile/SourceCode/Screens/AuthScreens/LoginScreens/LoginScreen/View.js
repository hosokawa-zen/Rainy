
//================================ React Native Imported Files ======================================//

import { View, Text, StatusBar, Image, TouchableOpacity, AsyncStorage  } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React from 'react';
import auth from '@react-native-firebase/auth';
import RNProgressHud from 'progress-hud';
import { Alert } from 'react-native';

//================================ Local Imported Files ======================================//

import AppHeader from '../../../../Components/AppHeader/AppHeader';
import AppInput from '../../../../Components/AppInput/AppInput';
import Button from '../../../../Components/Button/Button';
import colors from '../../../../Assets/Colors/colors';
import images from '../../../../Assets/Images/images';
import styles from "./Styles";
import CheckBox from '../../../../Components/CheckBox/CheckBox';
import database from '@react-native-firebase/database';
import {Constants} from '../../../../Constants';



class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUser: true,
            showPassword: true,
            rememberColor: 'red',
            image: images.ic_filter_active,
            email: '',
            password: '',
            remember: false,
        }
        AsyncStorage.getItem('remember').then(async (remeber) => {
            if (remeber == '1') {
                const email = await AsyncStorage.getItem('email')
                const password = await AsyncStorage.getItem('password')
                this.setState({email: email})
                this.setState({password: password})
                this.setState({remember: true})
            }
        })
    }
    rememberPassword = () => {
        this.setState({ isUser: !this.state.isUser })
    }
    togglePassword() {
        this.setState({ showPassword: !this.state.showPassword, isUser: !this.state.isUser })
    }

    onRemeber = (flag) => {
        this.setState({remember: flag})
        if (!flag) {
            AsyncStorage.setItem('remember', '0');
        } else {
            AsyncStorage.setItem('email', this.state.email);
            AsyncStorage.setItem('password', this.state.password);
            AsyncStorage.setItem('remember', '1');
        }
    }

    validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    isValid = () => {
        if(this.state.email.length ===0){
            alert('Please enter email address.');
            return false;
        }
        if(!this.validateEmail(this.state.email)){
            alert('Please enter valid email.');
            return false;
        }
        if(this.state.password.length ===0){
            alert('Please enter password.');
            return false;
        }
        return true;
    }

    toggleLogin() {
        if(!this.isValid()){
            return;
        }
        try {
            RNProgressHud.showWithStatus("Loading...");
            auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then((credential) => {
                    console.log('User account created & signed in!', credential);
                    const user = credential.user;
                    database().ref(`users/${user.uid}/`).once('value').then(snapshot => {
                        if (snapshot.exists()) {
                            const user = snapshot.val();
                            console.log('user', user);
                            Constants.user = user;
                            if (this.state.remember) {
                                AsyncStorage.setItem('email', this.state.email);
                                AsyncStorage.setItem('password', this.state.password);
                                AsyncStorage.setItem('remember', '1');
                            }
                            if (this.props && this.props.navigation) {
                                this.props.navigation.navigate('drawer')
                            }
                            RNProgressHud.dismiss();
                        }
                    });
                })
                .catch(error => {
                    RNProgressHud.dismiss();
                    alert(error.message)
                    console.error(error);
                });
        } catch (error) {
            alert(JSON.stringify(error))
        }
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.headerView}>

                     {/* //================================ StatusBar ======================================// */}
                    <StatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.appDarkBlue} translucent={false} />

                    {/* //================================ Header ======================================// */}
                    <AppHeader
                        leftIconPath={images.headerLeftBack}
                        onLeftIconPress={() => this.props.navigation.goBack()}
                        title={'Sign In'}

                    />
                </View>
                  {/* //================================ Logo ======================================// */}
                <View style={styles.upperView}>
                    <Image
                        style={styles.imageStyles}
                        source={images.logo}  >
                    </Image>
                </View>

                <View style={styles.midView}>
                        {/* //================================ Email Input ======================================// */}

                    <AppInput
                        value = {this.state.email}
                        onChangeText = {(text) => (this.setState({email: text}))}
                        height={hp(6)}
                        placeholder={'Email'}
                        width={'80%'}
                        colortextInput={colors.white}
                        paddingLeft={wp(5)}
                        marginBottom={wp(3)}
                        marginTop={5}
                        borderRadius={wp(1)}
                        backgroundColor={colors.app_header_color}
                        placeholderTextColor={colors.grey}                    />
                     {/* //================================ Password Input ======================================// */}
                    <AppInput
                        value = {this.state.password}
                        onChangeText = {(text) => (this.setState({password: text}))}
                        height={hp(6)}
                        borderRadius={wp(1)}
                        placeholder={'Password'}
                        width={'80%'}
                        marginTop={5}
                        secureEntry={this.state.showPassword}
                        onRightIconPress={() => this.togglePassword()}
                        colortextInput={colors.white}
                        paddingLeft={wp(5)}
                        rightIconSize={wp(5)}
                        marginBottom={wp(3)}
                        backgroundColor={colors.app_header_color}
                        placeholderTextColor={colors.grey}
                        rightIconPath={images.ic_eye}
                        tintColor={colors.app_light_blue}
                    />
                     {/* //================================ Remember Me ======================================// */}
                    <View style={styles.checkBoxContainer}>
                        <CheckBox
                            checked = {this.state.remember}
                            update = {(flag) => {this.onRemeber(flag)}}
                            checkTitle={'Remember Me'}
                        />
                        {/*<TouchableOpacity*/}
                        {/*    style={styles.checkBoxIcon}>*/}
                        {/*    <Image*/}
                        {/*        style={styles.checkBoxIconStyle}*/}
                        {/*        source={images.ic_check_green}*/}
                        {/*    />*/}
                        {/*</TouchableOpacity>*/}
                        {/*<View style={styles.checkBoxText}>*/}
                        {/*    <Text style={[styles.checkBoxTextStyle]}>Remember Me</Text>*/}
                        {/*</View>*/}
                    </View>

                </View>
                   {/* //================================ Buttons ======================================// */}
                <View style={styles.lowerView}>
                    <Button
                        height={hp(8)}
                        width={'80%'}
                        style={styles.buttonStyles}
                        title={'Sign In'}
                        bgColor={colors.app_button_color}
                        titleColor={colors.dark_red}
                        titleStyle={[styles.titleStyles,{color:colors.app_header_color}]}
                        onPress={() => this.toggleLogin()}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            if (this.props && this.props.navigation) {
                                this.props.navigation.navigate('ResetPassword')
                            }
                        } } >
                        <Text style={styles.textStyle}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
export default LoginScreen;
