
//================================ React Native Imported Files ======================================//

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, StatusBar } from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//

import AppHeader from "../../Components/AppHeader/AppHeader";
import colors from "../../Assets/Colors/colors";
import images from "../../Assets/Images/images";
import styles from './style';
import Button from "../../Components/Button/Button";

class TermsAndConditions extends React.Component {

    constructor(props) {
        super(props);
        
        
    }

    render() {
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
                    <Text style={styles.textContainer}>
                        {this.props.route.params.terms}
                    </Text>
                </View>
                <View style={styles.buttonView}>
                <Button title={'I Accept'} onPress={() => this.props.navigation.navigate('Payment', {key: this.props.route.params.key, price: this.props.route.params.price, count: this.props.route.params.count, deal: this.props.route.params.deal})}/>
                </View>
            </View>
        )
    }
}
export default TermsAndConditions;
