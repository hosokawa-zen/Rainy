import React from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import { GiftedChat } from 'react-native-gifted-chat';
import AppHeader from "../../Components/AppHeader/AppHeader";
import images from "../../Assets/Images/images";
import MessageRequestComponent from "../../Components/MessageResquestComponent/MessageRequestComponent";
import colors from "../../Assets/Colors/colors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';



export default class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        }
    }
    componentDidMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
            ],
        });
    }

    //==============================on Press Methods

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }

    render() {
        return(
            <View style={styles.mainContainer}>
                <View style={styles.headerView}>
                    <AppHeader
                        leftIconPath={images.headerLeftBack}
                        title={'John Williams'}
                        rightIconOnePath={images.ic_dot}
                        rightIconTwoPath={images.ic_delete}
                        onLeftIconPress={() => this.props.navigation.goBack()}
                    />
                </View>
               <View style={styles.container}>

                   <TouchableOpacity style={styles.textButton}
                   onPress={() => {
                    if (this.props && this.props.navigation) {
                        this.props.navigation.navigate('ReportDetailsScreen')
                    }
                   } }
                   >
                       <Image style={styles.icon} source={images.ic_i} />
                       <Text style={styles.text}>Incident, New Burglary in Country Homes</Text>
                   </TouchableOpacity>
                   <GiftedChat
                       messages={this.state.messages}
                       onSend={messages => this.onSend(messages)}
                       onPressAvatar={() => {
                        if (this.props && this.props.navigation) {
                            this.props.navigation.navigate('UserProfileScreen')
                        }}
                       }
                       user={{
                           _id: 1,
                       }}
                   />
               </View>
            </View>
        );
    }
}



