
//================================ React Native Imported Files ======================================//

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, StatusBar } from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//

import AppHeader from '../../../Components/AppHeader/AppHeader';
import colors from '../../../Assets/Colors/colors';
import images from '../../../Assets/Images/images';
import styles from './Styles'

import Pdf from 'react-native-pdf';

class TermsAndCondtions extends React.Component {

    constructor(props) {
        super(props);
        //================================ Dummy Text ======================================//
        this.source = {uri:'https://firebasestorage.googleapis.com/v0/b/constantino-308620.appspot.com/o/pdf%2FPrivacy%20Policy%20template-%20C.%20Randy.pdf?alt=media&token=24543729-0651-4e29-91b0-86bb5d88dafd',cache:true};
    }

    render() {
        const resourceType = 'url';
        return (
            <View style={styles.mainContainer}>
                {/* //================================ StatusBar ======================================// */}
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.app_background} translucent={false} />
                {/* //================================ Header ======================================// */}
                <View style={styles.headerView}>

                    <AppHeader
                        leftIconPath={images.headerLeftBack}
                        title={'Terms And Conditions'}
                        onLeftIconPress={() => this.props.navigation.goBack()}
                    />
                </View>
                {/* //================================ Bottom Container ======================================// */}
                <View style={styles.container}>
                    <Pdf
                        source={this.source}
                        style={styles.pdf}
                    />
                </View>
            </View>
        )
    }
}
export default TermsAndCondtions;
