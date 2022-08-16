import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Review = (props) => {
  return (
    <View style={styles.container} >
      <Text style={styles.Text}>
        Category {props.item.id}: {props.item.product.length}
      </Text>
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({
  container: {

    marginBottom: 5,
  },
  Text: {
    fontSize: 15,
  }
});
