//================================ React Native Imported Files ======================================//

import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import {Text, Image, View, TouchableOpacity, ImageBackground, AsyncStorage, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import * as React from 'react';

//================================ Local Imported Files ======================================//

import NewPassword from './Screens/AuthScreens/LoginScreens/EnterNewPasswordScreen/View';
import ResetPassword from './Screens/AuthScreens/LoginScreens/ResetPasswordScreen/View';
import SignupWith from './Screens/AuthScreens/SignupScreens/SignupWithScreen/View';
import TermsAndCondtions from './Screens/SettingScreens/TermConditionScreen/View';
import SignUpScreen from './Screens/AuthScreens/SignupScreens/SignupScreen/View';
import LoginScreen from './Screens/AuthScreens/LoginScreens/LoginScreen/View';
import SocialLoginScreen from './Screens/AuthScreens/LoginScreens/SoicalScreen/View';
import SendFeedback from './Screens/SettingScreens/SendFeedBackScreen/View';
import SettingsScreen from './Screens/SettingScreens/SettingScreen/View';
import PrivacyScreen from './Screens/SettingScreens/PrivacyScreen/View';
import AboutApp from './Screens/SettingScreens/AboutAppScreen/View';
import OnBoarding from './Screens/OnBoardingScreen/View';
import SplashScreen from './Screens/SplashScreen/View';
import images from './Assets/Images/images';
import colors from './Assets/Colors/colors';
// import Chat from "./Screens/Chat/Chat";
import ConsultationListComponent
    from './Components/NewAppComponents/ConsultationListComponent/ConsultationListComponent';
import ConsultationQuestionComponent
    from './Components/NewAppComponents/ConsultationQuestionComponent/ConsultationQuestionComponent';
import VetClinicComponent from './Components/NewAppComponents/VetClinicComponent/VetClinicComponent';
import UserProfile from './Screens/UserProfile/UserProfile';
import BrowseAllDeals from './Screens/BrowseAllDeals/BrowseAllDeals';
import MapScreen from './Screens/MapScreen/MapScreen';
import styles from '../SourceCode/Components/MyNav/styles';
import BrowseAllComponent from './Components/NewAppComponents/BrowseAllComponent/BrowseAllComponent';
import LockerComponent from './Components/NewAppComponents/LockerComponent/LockerComponent';
import TransactionComponent from './Components/NewAppComponents/TransactionComponent/TransactionComponent';
import PaymentComponent from './Components/NewAppComponents/PaymentComponent/PaymentComponent';
import Payment from './Screens/Payment/Payment';
import UseDeal from './Screens/UseDeal/UseDeal';
import NintendoSwitch from './Screens/NintendoSwitch/NintendoSwitch';
import ParticipatingBranches from './Screens/ParticipatingBranches/ParticipatingBranches';
import EditProfile from './Screens/EditProfile/EditProfile';
import TermsAndConditions from './Screens/TermsAndConditions/TermsAndConditions';
import BrowseModel from './Components/BrowseModel/BrowseModel';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {useState} from 'react';
import {Constants} from './Constants';


//================================ Drawer Function ======================================//

function CustomDrawerContent(props) {
    const user = Constants.user;
    const name = user.name ?? '';
    const avatar = user.avatar ?? '';

    return (

        <View {...props} style={styles.drawerMainContainer}>
            <View style={styles.backgroundImageContainer}>
                <TouchableOpacity style={styles.userInfoContainer}
                    // onPress={() => props.navigation.navigate('UserProfile')}
                >
                    <View style={styles.userImageContainer}
                        // onPress={() => props.navigation.navigate('ProfileScreen')}
                    >
                        <Image source={avatar !== '' ? {uri: avatar} : images.no_user_image}
                               style={styles.userProfileImage} resizeMode={'contain'}/>
                    </View>
                    <TouchableOpacity style={styles.userTextContainer}>
                        <Text style={styles.userNameText}>{`Hi, ${name}`}</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
                <View style={styles.drawerItemsContainer}>

                    <DrawerItem
                        style={styles.drawerItemStyles}
                        label={() => <Text style={styles.drawerItemLabelText}>{'Deal Locker'}</Text>}
                        icon={() => <Image source={images.ic_home} style={styles.drawerItemImage}/>}
                        onPress={() => props.navigation.navigate('BrowseAllDeals')}/>

                    <DrawerItem
                        style={styles.drawerItemStyles}
                        label={() => <Text style={styles.drawerItemLabelText}>{'My Locker'}</Text>}
                        icon={() => <Image source={images.ic_list} style={styles.drawerItemImage}/>}
                        onPress={() => props.navigation.navigate('UserProfile')}/>

                    <DrawerItem
                        style={styles.drawerItemStyles}
                        label={() => <Text style={styles.drawerItemLabelText}>{'Map'}</Text>}
                        icon={() => <Image source={images.map} style={styles.drawerItemImage}/>}
                        onPress={() => props.navigation.navigate('MapScreen')}/>

                    <DrawerItem
                        style={styles.drawerItemStyles}
                        label={() => <Text style={styles.drawerItemLabelText}>{'Settings'}</Text>}
                        icon={() => <Image source={images.ic_settings} style={styles.drawerItemImage}/>}
                        onPress={() => props.navigation.navigate('SettingsScreen')}
                    />

                    <DrawerItem style={[styles.drawerItemStyles]}
                                label={() => <Text style={[styles.drawerItemLabelText, {
                                    color: colors.app_red,
                                    fontWeight: '600',
                                }]}>{'Log out'}</Text>}
                                icon={() => <Image source={images.ic_logout_settings}
                                                   style={[styles.drawerItemImage, {tintColor: colors.app_red}]}/>}
                                onPress={() =>
                                    Alert.alert('Log out', 'Are you sure to log out?', [{
                                        text: 'Cancel',
                                        style: 'cancel',
                                    }, {
                                        text: 'confirm', onPress: () => {
                                            auth().signOut().then(r => props.navigation.navigate('SocialLoginScreen'));
                                        },
                                    }], {cancelable: true})}
                    />
                </View>
            </View>
        </View>

    );
}

//================================ Drawer Navigator ======================================//

const Drawer = createDrawerNavigator();

function drawerNav() {
    return (
        <Drawer.Navigator
            initialRouteName="BrowseAllDeals"
            drawerContent={props => CustomDrawerContent(props)}>
            <Drawer.Screen name="BrowseAllDeals" component={BrowseAllDeals}/>
            <Drawer.Screen name="UserProfile" component={UserProfile}/>
            <Drawer.Screen name="MapScreen" component={MapScreen}/>
            <Drawer.Screen name="SettingsScreen" component={SettingsScreen}/>
        </Drawer.Navigator>
    );
}


//================================ Root Stack ======================================//


const RootStack = createStackNavigator();
export default function myStack() {
    return (
        <NavigationContainer>
            <RootStack.Navigator
                initialRouteName={'splashScreen'}
                headerMode={'none'}
                screenOptions={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}>
                <RootStack.Screen name="splashScreen" component={SplashScreen}/>
                <RootStack.Screen name="ResetPassword" component={ResetPassword}/>
                <RootStack.Screen name="PrivacyScreen" component={PrivacyScreen}/>
                <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
                <RootStack.Screen name="SocialLoginScreen" component={SocialLoginScreen}/>
                <RootStack.Screen name="SendFeedback" component={SendFeedback}/>
                <RootStack.Screen name="LoginScreen" component={LoginScreen}/>
                <RootStack.Screen name="NewPassword" component={NewPassword}/>
                <RootStack.Screen name="SignupWith" component={SignupWith}/>
                <RootStack.Screen name="OnBoarding" component={OnBoarding}/>
                <RootStack.Screen name="AboutApp" component={AboutApp}/>
                {/*<RootStack.Screen name="UserChat" component={Chat} />*/}
                <RootStack.Screen name="TermsAndCondtions" component={TermsAndCondtions}/>

                <RootStack.Screen name="Payment" component={Payment}/>
                <RootStack.Screen name="UseDeal" component={UseDeal}/>
                <RootStack.Screen name="NintendoSwitch" component={NintendoSwitch}/>
                <RootStack.Screen name="ParticipatingBranches" component={ParticipatingBranches}/>
                <RootStack.Screen name="EditProfile" component={EditProfile}/>
                <RootStack.Screen name="TermsAndConditions" component={TermsAndConditions}/>

                <RootStack.Screen name="drawer" component={drawerNav}/>

                {/*Components*/}

                <RootStack.Screen name="ConsultationListComponent" component={ConsultationListComponent}/>
                <RootStack.Screen name="ConsultationQuestionComponent" component={ConsultationQuestionComponent}/>
                <RootStack.Screen name="VetClinicComponent" component={VetClinicComponent}/>

                <RootStack.Screen name="BrowseAllComponent" component={BrowseAllComponent}/>
                <RootStack.Screen name="LockerComponent" component={LockerComponent}/>
                <RootStack.Screen name="TransactionComponent" component={TransactionComponent}/>
                <RootStack.Screen name="PaymentComponent" component={PaymentComponent}/>
                <RootStack.Screen name="BrowseModel" component={BrowseModel}/>

            </RootStack.Navigator>
        </NavigationContainer>
    );
}





