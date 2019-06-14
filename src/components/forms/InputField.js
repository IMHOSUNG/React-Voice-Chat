import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import Icon from 'react-native';
import colors from '../../styles/colors';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
} from 'react-native';

export default class InputField extends Component {
    render() {
        const { labelText, labelTextSize, labelColor, textColor, borderBottomColor,inputType, customStyle, handler } = this.props;
        const fontSize = labelTextSize || 14;
        const color = labelColor || colors.white;
        const inputColor =  textColor || colors.white;
        const borderBottom = borderBottomColor || 'transparent';
        return (
            <View style = {[customStyle, styles.wrapper]}>
                <Text style = {[{color,fontSize},styles.label]}>{labelText}</Text>
                <TextInput
                  autoCorrect={false}
                  style={[{color: inputColor, borderBottomColor: borderBottom},styles.inputField]}
                  onChangeText={inputType === 'email' ? handler('phone') : handler('name')}
                  secureTextEntry = {inputType === 'password' ? true : false}
                />
            </View>
        );
    }
}

InputField.propTypes = {
    labelText: PropTypes.string.isRequired,
    labelTextSize: PropTypes.number,
    labelColor: PropTypes.string,
    textColor: PropTypes.string,
    borderBottomColor: PropTypes.string,
    inputType: PropTypes.string.isRequired,
    customStyle : PropTypes.object,
    handler: PropTypes.func,
};

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
    },
    label:{
        fontWeight: '700',
        marginBottom: 10,
    },
    inputField: {
        borderBottomWidth: 1,
        paddingTop: 5,
        paddingBottom: 5,
    }
});