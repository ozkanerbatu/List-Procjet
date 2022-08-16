import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useRef } from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
const Product = (props) => {
  const { selectProduct, selectCategoryProduct,categoryId } = props;
  return (
    <TouchableOpacity
      onPress={() =>
        categoryId !== 0
          ? selectCategoryProduct(props.id, categoryId)
          : selectProduct(props.id)
      }
      style={styles.container}
    >
      {props.isSelected ? (
        <MaterialCommunityIcons
          name="checkbox-outline"
          size={24}
          color="black"
        />
      ) : (
        <MaterialCommunityIcons
          name="checkbox-blank-outline"
          size={24}
          color="black"
        />
      )}
      <Text style={styles.text}>Product {props.id}</Text>
    </TouchableOpacity>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    marginBottom: 5,
  },
  text: {
    marginLeft: 15,
  },
});
