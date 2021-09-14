
//================================ React Native Imported Files ======================================//

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, StatusBar, Image, } from 'react-native';
import React from 'react';
//================================ Local Imported Files ======================================//

import AppHeader from '../../../Components/AppHeader/AppHeader';
import Button from '../../../Components/Button/Button';
import colors from '../../../Assets/Colors/colors';
import images from '../../../Assets/Images/images';
import styles from "./Styles";

class AboutApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (

            <View style={styles.mainContainer}>
                {/* //================================ StatusBar ======================================// */}
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.app_background} translucent={false} />

                {/* //================================ Header ======================================// */}
                <View style={styles.headerView}>

                    <AppHeader
                        title={'ABOUT THE APP'}
                        leftIconPath={images.headerLeftBack}
                        onLeftIconPress={() => this.props.navigation.goBack()}

                    />

                </View>

                {/* //================================ Uper View ======================================// */}

                <View style={styles.uperView}>
                    <View style={styles.uperImageView}>
                        <Image
                            style={styles.imageStyles}
                            source={images.logo} />

                    </View>
                    <View style={styles.uperText1View}>
                        <Text style={styles.CopyrightTextStyle}>Version 1.00</Text>

                    </View>
                    <View style={styles.uperText2View}>
                        <Text style={styles.DeveloperTextStyle}>Copyright 2020 - constantinoRandy.com</Text>

                    </View>
                    <View style={styles.uperText3View}>
                        <Text style={styles.VersionTextStyle}>BrainyApps Inc.</Text>

                    </View>

                </View>

                {/* //================================ Text ======================================// */}

                <View style={styles.BottomTextView}><Text style={styles.MainTextStyle}>Deal Locker is a one-stop solution and platform to see promotions, deals and discounts from stores, determine redemption period and redeem for future purchases. Fill your items cart and access a final breakdown of items with a Final Bill before confirming a purchase. Choose from multiple shipping options available once the default courier is inaccessible.
                    Information such as deals purchased, available deals and overall total savings are provided by the app. Users may also view their own real-time location in the app’s Map and view listings within the location along with their listing details. Once individual deals are redeemed, users can save them in the app’s “My Locker” feature where you can also view the history of deals obtained or redeemed and can be use in the future.</Text></View>

                {/* //================================ Button ======================================// */}

                <View style={styles.BottonView}>
                  <Button title={'CONTACT US'}/>
                </View>
            </View>
        )
    }
}
export default AboutApp;
