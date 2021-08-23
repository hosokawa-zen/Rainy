
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

                <View style={styles.BottomTextView}><Text style={styles.MainTextStyle}>It is a long established fact that a reader will be distracted by the
                readable content of a page when looking at its layout. The point of using
                Lorem Ipsum is that it has a more-or-less normal distribution of letters. It is a long established fact that a reader will be distracted by the
                readable content of a page when looking at its layout. The point of using
                Lorem Ipsum is that it has a more-or-less normal distribution of letters</Text></View>

                {/* //================================ Button ======================================// */}

                <View style={styles.BottonView}>
                  <Button title={'CONTACT US'}/>
                </View>
            </View>
        )
    }
}
export default AboutApp;
