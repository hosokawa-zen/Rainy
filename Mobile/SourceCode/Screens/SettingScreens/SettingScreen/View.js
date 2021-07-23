
//================================ React Native Imported Files ======================================//

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {View, FlatList, StatusBar, Image, Text, TouchableOpacity, Modal, Alert} from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//

import SettingsItem from '../../../Components/SettingsItem/SettingItem';
import AppHeader from '../../../Components/AppHeader/AppHeader';
import RateApp from "../../../Components/RateModel/RateApp";
import images from '../../../Assets/Images/images';
import colors from '../../../Assets/Colors/colors';
import styles from "./Styles";
import auth from '@react-native-firebase/auth';

class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            //================================ Data array ======================================//
            Data: [
                {
                    id: 1,
                    title: 'Notification Settings',
                    firstIcon: images.ic_share_settings,
                    toggleSwitchButton: true,
                },
                {
                    id: 2,
                    title: 'Rate App',
                    firstIcon: images.ic_rate_app_settings,
                    leftIconColor: colors.AppRedColor,
                    secondIcon: images.ic_chevron_right,

                },

                {
                    id: 3,
                    title: 'Contact Us',
                    firstIcon: images.ic_bell_blue,
                    secondIcon: images.ic_chevron_right,
                    leftIconColor: colors.AppRedColor,
                },
                {
                    id: 4,
                    title: 'About the App',
                    firstIcon: images.ic_about,
                    secondIcon: images.ic_chevron_right,
                    leftIconColor: colors.AppRedColor,

                },
                {
                    id: 5,
                    title: 'Privacy Policy',
                    firstIcon: images.ic_privacy,
                    secondIcon: images.ic_chevron_right,
                    leftIconColor: colors.AppRedColor,

                },
                {
                    id: 6,
                    title: 'Terms And Conditions',
                    firstIcon: images.ic_terms_1,
                    secondIcon: images.ic_chevron_right,
                    leftIconColor: colors.AppRedColor,

                },

                {
                    id: 7,
                    title: 'Log Out',
                    firstIcon: images.ic_logout_settings,
                    secondIcon: images.ic_chevron_right,
                    leftIconColor: colors.AppRedColor,

                },
            ]
        }
    }

    //================================ Model Functions ======================================//

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    };

    inVisible() {
        this.setState({ modalVisible: false })
    }

    onClickListItem(id) {
        switch (id) {

            case 1:
                break;

            case 2:
                this.setModalVisible(true);
                break;

            case 3:
                this.props.navigation.navigate('SendFeedback');
                break;

            case 4:
                this.props.navigation.navigate('AboutApp');
                break;

            case 5:
                this.props.navigation.navigate('PrivacyScreen');
                break;
            case 6:
                this.props.navigation.navigate('TermsAndCondtions');
                break;
            case 7:
                Alert.alert('Log out', 'Are you sure to log out?', [{
                    text: 'Cancel',
                    style: 'cancel'
                }, {text: 'confirm', onPress: () => {
                        auth().signOut().then(r => this.props.navigation.navigate('SocialLoginScreen'));
                    }}], { cancelable: true });
                break;
        }
    }
    //================================ Setting Item Function ======================================//
    list(item) {
        return (
            <SettingsItem
                onPress={() => {
                    this.onClickListItem(item.id)
                }}
                upperText={item.title}
                leftIconImage={item.firstIcon}
                arrowImage={item.secondIcon}
                switchItem={item.switchItem}
                rightIconColor={colors.grey1}
                rightIconSize={wp(3.5)}
                leftIconSize={wp(4.5)}
                height={hp(8)}
                backgroundColor={'rgba(255, 255, 255, 0.6)'}
                leftIconColor={item.color}
                textColor={item.color}
                toggleSwitchButton={item.toggleSwitchButton}
            />
        )
    }
    render() {
        const { modalVisible } = this.state;
        return (
            <View style={styles.mainContainer}>
                {/* //================================ StatusBar ======================================// */}

                <StatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.appDarkBlue} translucent={false} />
                {/* //================================ Header ======================================// */}
                <View style={styles.headerView}>
                    <AppHeader
                        title={'Settings'}
                        leftIconPath={images.ic_hamburger_menu}
                        onLeftIconPress={()=> this.props.navigation.openDrawer()}
                    />
                </View>
                {/* //================================ FlatList ======================================// */}
                <View style={styles.container}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={this.state.Data}
                        renderItem={({ item }) => this.list(item)}
                        keyExtractor={item => item.id}
                    />

                </View>
                {/* //================================ Model ======================================// */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!modalVisible);
                    }}>
                    <RateApp
                        onRateApp = {
                            () => this.setModalVisible(!modalVisible)
                        }
                        onPressLater={() => {
                            this.setModalVisible(!modalVisible)
                        }}
                    />
                </Modal>
                {/* //================================ Logout ======================================// */}
                {/*<TouchableOpacity style={styles.logout}*/}
                {/*    onPress={() => this.props.navigation.navigate('SocialLoginScreen')}*/}
                {/*>*/}
                {/*    <Image*/}
                {/*        style={styles.logoutIcon}*/}
                {/*        source={images.ic_logout_settings}*/}
                {/*    />*/}
                {/*    <Text style={[styles.textStyle, {*/}
                {/*        color: colors.white*/}
                {/*    }]}>Log Out</Text>*/}

                {/*</TouchableOpacity>*/}
            </View>
        )
    }
}
export default SettingsScreen;
