import { StyleSheet, Text, View } from "react-native";
import React from "react";
import StripeApp from "../components/StripeApp";
import { SafeAreaView } from "react-native-safe-area-context";
import { StripeProvider } from "@stripe/stripe-react-native";

const Upgrade = () => {
  return (
    <SafeAreaView>
      <StripeProvider publishableKey="pk_test_51NDaDPLnEduMLQLp8J5U0t1VFIKBirqY4bRaPv0AHfpEGvmHSZuadXgFRC3DGzyZVhuLURa86Ncq5KCjCNC1oh85008zQ1YDun">
        <StripeApp />
      </StripeProvider>
    </SafeAreaView>
  );
};

export default Upgrade;

const styles = StyleSheet.create({});
