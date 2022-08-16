import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import Product from "./Product";

const CategoryCard = (props) => {
  const [addButton, setAddButton] = useState(false);
  const [removeButton, setRemoveButton] = useState(false);
  const [removeCategory, setRemoveCategory] = useState(false);
  const {
    item,
    renderItemProduct,
    allProducts,
    categories,
    addProductInCategory,
    moveProductCategoryFormAllProduct,
    removeCategoryFunc,
  } = props;
  const categoryId = item.id;
  useEffect(() => {
    setAddButton(!!allProducts.find((item) => item.isSelected === true));
  }, [allProducts]);
  useEffect(() => {
    setRemoveButton(!!item.product.find((item) => item.isSelected === true));
  }, [item.product]);
  useEffect(() => {
    categories.length > 1 ? setRemoveCategory(true) : setRemoveCategory(false);
  }, [categories]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Feather name="list" size={30} color="black" />
        <Text style={styles.headerText}>Category {item.id}</Text>
      </View>
      <View style={styles.body}>
        <FlatList
          data={props.item.product}
          renderItem={({ item }) =>
            renderItemProduct(item.id, item.isSelected, categoryId)
          }
          scrollEnabled={false}
          ListEmptyComponent={() => (
            <View style={styles.emptyView}>
              <Text style={styles.emptyText}>Select products to add here</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => {
            addButton
              ? addProductInCategory(categoryId)
              : alert("Please select product in Product list");
          }}
          style={[
            styles.button,
            addButton
              ? { backgroundColor: "lightblue" }
              : { backgroundColor: "#EEEEEE" },
          ]}
        >
          <Text>Add Product</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            removeButton
              ? moveProductCategoryFormAllProduct(categoryId)
              : alert(`Please select product in Category ${categoryId} list`);
          }}
          style={[
            styles.button,
            removeButton
              ? { backgroundColor: "lightblue" }
              : { backgroundColor: "#EEEEEE" },
          ]}
        >
          <Text>Remove Product</Text>
        </TouchableOpacity>
      </View>
      {removeCategory && (
        <TouchableOpacity
          onPress={() => {
            removeCategoryFunc(categoryId);
          }}
          style={[
            styles.button,
            {
              backgroundColor: "#074EE8",
              position: "absolute",
              right: 5,
              top: 5,
            },
          ]}
        >
          <Text>Remove Category</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    width: "99%",
    alignSelf: "center",
  },
  footer: {
    flexDirection: "row",
    width: "100%",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 7,
    margin: 5,
    borderRadius: 10,
  },
  emptyView: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 17,
    color: "gray",
  },
});
