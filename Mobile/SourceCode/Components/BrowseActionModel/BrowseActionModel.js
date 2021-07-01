import React from 'react';
import { View,Text,TextInput,StyleSheet,Image,ImageBackground,TouchableOpacity,ScrollView} from 'react-native';

import styles from './style';


class BrowseActionModel extends React.Component{

    constructor(props) {
        super(props);

        this.state={

            dummyText:'If you love our app we would appreciate you if you take a couple' +
                ' of seconds to rate us  in the app market!',

        }
    }

    render()
    {
        return(

            <View style={styles.mainContainer}>

                <View style={styles.container}>

                    <View style={styles.topTitle}>
                        <Text style={styles.textRateApp}>
                            Deals Status
                        </Text>
                    </View>
                    <View style={styles.bottomButtons}>
                        <TouchableOpacity style={styles.rateNowContainer}
                                          onPress={() => {this.props.onPressItem(0)}}
                        >
                            <Text style={styles.submitBurron}>Active</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {this.props.onPressItem(1)}}
                            style={styles.laterContainer}>
                            <Text style={styles.submitBurron}>Available</Text>
                        </TouchableOpacity>
                    </View>

                    </View>
            </View>
        )
    }
}

export default BrowseActionModel;
