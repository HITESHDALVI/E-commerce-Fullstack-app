import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import {colors} from '../assets/styles/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dimension} from '../utilis/constants';
import Entypo from 'react-native-vector-icons/Entypo';

type Props = {
  iconName: string;
  value: string;
  placeholder: string;
  onChangeText: () => void;
  handlePasswordToogle: () => void;
  toogle: boolean;
};

const InputField = ({
  iconName,
  value,
  placeholder,
  onChangeText,
  handlePasswordToogle,
  toogle = false,
}: Props): React.ReactElement => {
  return (
    <View style={styles.inputWrapper}>
      <MaterialCommunityIcons name={iconName} size={25} color={colors.gray} />
      <TextInput
        value={value}
        style={styles.inputText}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={toogle}
      />
      {iconName === 'shield-lock' && (
        <Entypo
          name={toogle ? 'eye' : 'eye-with-line'}
          size={25}
          onPress={handlePasswordToogle}
          color={colors.gray}
        />
      )}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 30,
    backgroundColor: colors.lightGray,
    width: Dimension.width - 50,
  },
  inputText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,

    color: colors.gray,
    marginVertical: 7,
    width: 300,
  },
});
