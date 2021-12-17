import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { Context as AuthContext } from "../context/AuthContext";
import { NavigationEvents } from "react-navigation";

const SigninScreen = ({ navigation }) => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillBlur={clearErrorMessage} />
      <AuthForm
        headerText="Sign in to your Account"
        errorMessage={state.errorMessage}
        onSubmit={({ email, password }) => signin({ email, password })}
        buttonText="Sign in"
      />
      <NavLink text="Don't have an account? Sign up" routeName="Signup" />
    </View>
  );
};

// SigninScreen.navigationOptions = () => {
//   header: false;
// };

SigninScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 200,
  },
});

export default SigninScreen;
