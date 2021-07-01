//================================ React Native Imported Files ======================================//

import { ImageBackground, StatusBar,Image, View } from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//

import styles from './Styles';
import Colors from '../../Assets/Colors/colors';
import images from '../../Assets/Images/images';


class SplashScreen extends React.Component {

    //================================ component Did Mount ======================================//

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('OnBoarding');
        }, 1500);
    }
    render() {
        return (

            <View style={styles.mainContainer} >
                {/* //================================ StatusBar ======================================// */}
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor={Colors.app_background} translucent={false} />
                <Image style={styles.image} source={images.logo}/>
            </View>


        )
    }
}



export default SplashScreen;
