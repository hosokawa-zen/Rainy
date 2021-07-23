//================================ React Native Imported Files ======================================//

import {Image, StatusBar, View} from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//
import styles from './Styles';
import Colors from '../../Assets/Colors/colors';
import images from '../../Assets/Images/images';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {Constants} from '../../Constants';


class SplashScreen extends React.Component {

    //================================ component Did Mount ======================================//

    componentDidMount() {
        setTimeout(() => {
            auth().onAuthStateChanged((user) => {
                if (user) {
                    console.log('user is logged');
                    const userId = user.uid;
                    database().ref(`users/${userId}/`).once('value').then(snapshot => {
                        if (snapshot.exists()) {
                            Constants.user = snapshot.val();
                            this.props.navigation.navigate("drawer")
                        }
                    })
                } else {
                    this.props.navigation.navigate("OnBoarding")
                }
            });
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
