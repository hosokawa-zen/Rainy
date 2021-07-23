
//================================ React Native Imported Files ======================================//

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, StatusBar } from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//

import AppHeader from '../../../Components/AppHeader/AppHeader';
import AppInput from '../../../Components/AppInput/AppInput';
import Button from '../../../Components/Button/Button';
import images from '../../../Assets/Images/images';
import colors from '../../../Assets/Colors/colors';
import styles from './Styles'

class SendFeedback extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            subject: '',
            content: ''
        }
    }

    validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    isValid = () => {
        const {name, email, subject, content} = this.state;
        if(email.trim().length === 0){
            alert('Please enter email address.');
            return false;
        }
        if(!this.validateEmail(email.trim())){
            alert('Please enter valid email address.');
            return false;
        }
        return true;
    }

    onSend = () => {
        if(!this.isValid()){
            return;
        }
        this.props.navigation.pop();
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                {/* //================================ StatusBar ======================================// */}

                <StatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.app_background} translucent={false} />
                {/* //================================ Header ======================================// */}
                <View style={styles.headerView}>

                    <AppHeader
                        title={'Send Feedback'}
                        leftIconPath={images.headerLeftBack}
                        onLeftIconPress={() => this.props.navigation.goBack()}

                    />

                </View>
                {/* //================================ Middle Container ======================================// */}
                <View style={styles.middleView}>
                    <View style={styles.NameView}>
                        <Text style={styles.headingText}>Name</Text>
                        <AppInput
                            height={hp(7)}
                            width={'90%'}
                            value = {this.state.name}
                            onChangeText = {(text) => this.setState({name: text})}
                            backgroundColor={colors.app_dark_white}
                        />

                    </View>
                    <View style={styles.EmailView}>
                        <Text style={styles.headingText}>Email Address</Text>
                        <AppInput
                            height={hp(7)}
                            width={'90%'}
                            value = {this.state.email}
                            onChangeText = {(text) => this.setState({email: text})}
                            backgroundColor={colors.app_dark_white}
                        />
                    </View>
                    <View style={styles.SubjectView}>
                        <Text style={styles.headingText}>Subject/Concern</Text>
                        <AppInput
                            height={hp(7)}
                            width={'90%'}
                            value = {this.state.subject}
                            onChangeText = {(text) => this.setState({subject: text})}
                            backgroundColor={colors.app_dark_white}
                        />

                    </View>
                    <View style={styles.MessageView}>
                        <Text style={styles.headingText}>Message</Text>

                        <AppInput
                            height={hp(15)}
                            width={'90%'}
                            value = {this.state.content}
                            onChangeText = {(text) => this.setState({content: text})}
                            backgroundColor={colors.app_dark_white}
                        />
                    </View>
                    <View style={styles.CharacterView}>
                        <Text style={styles.CharacterStyle}>5000 Remaining Characters</Text>
                    </View>
                </View>
                {/* //================================ Buttons ======================================// */}
                <View style={styles.LastView}>
                    <View style={styles.saveButtonView}>
                        <Button title={'SEND'} onPress={this.onSend}/>
                    </View>
                </View>
            </View>
        )
    }
}
export default SendFeedback;
