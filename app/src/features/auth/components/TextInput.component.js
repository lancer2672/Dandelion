import React, { memo, useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

const InputText = ({
  iconLeft,
  iconRight,
  onIconPress,
  placeholder,
  text,
  setText,
  onBlur,
  disabled,
  passwordType,
  hasValidationError,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <TextInput
      mode="outlined"
      outlineStyle={{
        borderRadius: 25,
      }}
      outlineColor={hasValidationError && "red"}
      style={styles.textInput}
      secureTextEntry={passwordType && !showPassword}
      disabled={disabled}
      value={text}
      left={
        <TextInput.Icon
          size={20}
          style={{
            marginRight: 0,
            fontSize: 12,
          }}
          disabled={true}
          icon={iconLeft}
        />
      }
      onBlur={onBlur}
      right={
        passwordType && (
          <TextInput.Icon
            size={20}
            onPress={() => {
              setShowPassword(!showPassword);
            }}
            icon={showPassword ? "eye" : "eye-off"}
          />
        )
      }
      onChangeText={(newText) => setText(newText)}
      placeholder={placeholder}
    ></TextInput>
  );
};

export default memo(InputText);

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "white",
    width: 250,
    marginTop: 8,
    fontSize: 14,
  },
});