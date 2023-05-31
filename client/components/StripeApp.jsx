import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import { UserContext } from "../navigation/Routes";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import axios from "../axios";
import { Button } from "react-native";
import { Image } from "react-native";

const StripeApp = () => {
  const { user, setUser } = useContext(UserContext);
  console.log(user);
  const [email, setEmail] = useState("");
  const [cardDetails, setCardDetails] = useState(null);
  const { confirmPayment, loading } = useConfirmPayment();

  const fetchPaymentIntentClientSecret = async () => {
    console.log("fetchPaymentIntentClientSecret");
    const response = await axios.post("/payment/create-payment-intent");
    console.log("response", response.data);

    const { clientSecret, error } = await response?.data;
    console.log("clientSecret", clientSecret);
    console.log("error", error);
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    if (!cardDetails?.complete || !email) {
      alert("Please enter complete card details");
      return;
    }

    const billingDetails = {
      email: email,
    };

    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();

      if (error) {
        alert(`Error: ${error}`);
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          paymentMethodType: "Card",
          billingDetails,
        });
        if (error) {
          alert(`Error: ${error.message} tum ho`);
        } else if (paymentIntent) {
          alert(`Payment Successful`);
          console.log("Payment successful ", paymentIntent);
          console.log(paymentIntent.status);
        }
      }

      setUser({ ...user, upgrade: true });

      //   upgrade the user

      //   const response = await axios.post("/user/upgrade", {
      //     userId: user.userId,
      //   });
      //   console.log("upugrade", response?.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <View style={{ paddingHorizontal: 20 }}>
      <View
        style={{
          marginTop: 50,
          alignItems: "center",
        }}
      >
        <Image source={require("../assets/main/logo-transparent.png")} style={{ width: 170, height: 170 }} />
      </View>
      <View>
        <Text
          style={{
            fontSize: 30,
            fontFamily: "Roboto_700Bold",
            marginTop: 20,
          }}
        >
          Upgrade
        </Text>
      </View>

      <TextInput
        placeholder="email"
        keyboardType="email-address"
        autoCapitalize="none"
        onChange={(value) => setEmail(value.nativeEvent.text)}
        style={{
          width: "100%",
          height: 50,
          backgroundColor: "#d7f7fc",
          borderRadius: 8,
          marginVertical: 10,
          paddingHorizontal: 10,
          fontFamily: "Roboto_400Regular",
        }}
      />

      <View>
        <CardField
          postalCodeEnabled={true}
          placeholder={{
            number: "4242 4242 4242 4242",
          }}
          onCardChange={(cardDetails) => {
            setCardDetails(cardDetails);
          }}
          cardStyle={styles.card}
          style={styles.cardContainer}
        />
      </View>

      {!user?.upgrade ? (
        <TouchableOpacity
          style={{
            width: "100%",
            height: 50,
            backgroundColor: "#7b93ff",
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={loading ? null : handlePayPress}
        >
          {loading ? (
            <ActivityIndicator size={"small"} color="#fff" />
          ) : (
            <Text style={{ color: "#fff", fontFamily: "Roboto_400Regular" }}>Upgrade</Text>
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            width: "100%",
            height: 50,
            backgroundColor: "#7b93ff",
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => alert("you are already upgraded")}
        >
          <Text style={{ color: "#fff", fontFamily: "Roboto_400Regular" }}>Already Upgraded</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default StripeApp;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#d7f7fc",
    borderRadius: 8,
  },
  cardContainer: {
    width: "100%",
    height: 50,
    marginBottom: 10,
  },
});
