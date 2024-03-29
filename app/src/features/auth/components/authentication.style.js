import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const BackgroundImage = styled.ImageBackground.attrs((props) => ({
  source: require("@assets/imgs/Auth.jpg"),
  opacity: props.isLoading ? 0.5 : 1,
}))`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image.attrs((props) => ({
  source: require("@assets/imgs/Logo.png"),
}))`
  width: 200px;
  height: 200px;
  resize-mode: contain;
`;

export const AuthButton = styled(TouchableOpacity).attrs((props) => ({
  // disabled: props.isValidated ? false : true,
}))`
  min-width: 300px;
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
  border-radius: 4px;
  elevation: 2;
  background-color: ${(props) => props.theme.colors.bg.tertiary};
`;

export const AuthButtonContent = styled(Text)`
  align-self: center;
  font-weight: bold;
  padding-vertical: 2px;
  font-size: 16px;
  color: white;
`;
export const Slogan = styled(Text)`
  font-style: italic;
  font-weight: 500;
  color: white;
  margin-bottom: 40px;
`;
export const Error = styled(Text)`
  margin-top: 8px;
  color: ${(props) => props.theme.colors.text.error};
`;
export const RemememberCheckButton = () => {
  return;
};
