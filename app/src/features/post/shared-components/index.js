import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "styled-components";
import styled from "styled-components/native";

export const Seperator = styled(View)`
  border-width: 1px;
  border-color: #9cabad;
`;
export const UserName = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  color: ${(props) => props.theme.colors.text.primary};
`;
export const Header = ({
  onBackButtonPress,
  heading,
  buttonContent,
  isDisabled,
  onButtonPress,
}) => {
  const theme = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 8,
      }}
    >
      <TouchableOpacity onPress={onBackButtonPress}>
        <Ionicons
          name="arrow-back"
          size={32}
          color={theme.colors.text.primary}
        />
      </TouchableOpacity>

      <Heading>{heading}</Heading>

      <Button isDisabled={isDisabled} onPress={onButtonPress}>
        <ButtonContent>{buttonContent}</ButtonContent>
      </Button>
    </View>
  );
};

const Heading = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  color: ${(props) => props.theme.colors.text.primary};
  flex: 1;
  margin-left: 12px;
`;
const Button = styled(Pressable).attrs((props) => ({
  opacity: props.isDisabled ? 0.6 : 1,
  disabled: props.isDisabled,
}))`
  background-color: ${(props) => props.theme.colors.text.primary}
  border-radius: 4px;
  justify-content: center;
  padding-vertical: 8px;
  padding-horizontal:16px;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 4px;
  shadow-opacity: 0.4;
  shadow-radius: 4px;
  elevation: 1;
`;
const ButtonContent = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  color: ${(props) => props.theme.colors.bg.primary};
`;
