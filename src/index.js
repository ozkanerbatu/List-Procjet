import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import CategoryCard from "./components/CategoryCard";
import { Ionicons } from "@expo/vector-icons";
import Product from "./components/Product";
import { Feather } from "@expo/vector-icons";
import Review from "./components/Review";
const { width, height } = Dimensions.get("window");
const Home = () => {
  const [allProducts, setAllProducts] = useState([
    { id: 1, isSelected: false },
    { id: 2, isSelected: false },
    { id: 3, isSelected: false },
    { id: 4, isSelected: false },
    { id: 5, isSelected: false },
    { id: 6, isSelected: false },
    { id: 7, isSelected: false },
    { id: 8, isSelected: false },
    { id: 9, isSelected: false },
    { id: 10, isSelected: false },
  ]);
  const [categories, setCategories] = useState([{ id: 1, product: [] }]);
  useEffect(() => {
    setAllProducts((prev) => prev.sort((a, b) => a.id - b.id));
    setCategories((prev) => prev.sort((a, b) => a.id - b.id));
  }, [categories, allProducts]);

  const removeCategory = (id) => {
    setCategories(categories.filter((item) => item.id !== id));
    setAllProducts((prev) => [
      ...prev,
      ...categories.find((item) => item.id === id).product,
    ]);
    setAllProducts((prev) => prev.sort((a, b) => a.id - b.id));
  };
  const moveProductCategoryFormAllProduct = (categoryId) => {
    const selected = categories
      .find((item) => item.id === categoryId)
      .product.filter((item) => item.isSelected === true);
    setAllProducts((prev) => [...prev, ...selected]);
    removeUnselectCategoryProduct(categoryId);
    unselectAllProducts();
  };
  const removeUnselectCategoryProduct = (categoryId) => {
    setCategories((prev) => {
      return prev.map((item) => {
        if (item.id === categoryId) {
          return {
            ...item,
            product: item.product.filter((item) => item.isSelected === false),
          };
        }
        return item;
      });
    });
  };
  const addProductInCategory = (categoryId) => {
    // product to category
    setCategories((prevState) => {
      return prevState.map((item) => {
        if (item.id === categoryId) {
          return {
            ...item,
            product: [
              ...item.product,
              ...allProducts.filter((item) => item.isSelected === true),
            ],
          };
        } else {
          return item;
        }
      });
    });
    //unselect all products
    setCategories((prev) =>
      prev.map((item) => {
        if (item.id === categoryId) {
          return {
            ...item,
            product: item.product.map((item) => {
              return { ...item, isSelected: false };
            }),
          };
        } else {
          return item;
        }
      })
    );
    //remove selected products from all products
    removeProductFromAllProducts();
  };
  const unselectAllProducts = () => {
    setAllProducts((prev) =>
      prev.map((item) => ({ ...item, isSelected: false }))
    );
  };

  const findBiggestCategoryId = () => {
    const biggestCategoryId = categories.reduce((prev, curr) => {
      return prev.id > curr.id ? prev : curr;
    }).id;
    return biggestCategoryId + 1;
  };
  const addCategory = () => {
    setCategories([
      ...categories,
      { id: findBiggestCategoryId(), product: [] },
    ]);
  };
  const removeProductFromAllProducts = () => {
    setAllProducts((prev) => [
      ...prev.filter((item) => item.isSelected == false),
    ]);
  };
  const selectProduct = (id) => {
    setAllProducts((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return { ...item, isSelected: !item.isSelected };
        } else {
          return item;
        }
      });
    });
  };
  const selectCategoryProduct = (id, categoryId) => {
    setCategories((prev) =>
      prev.map((item) => {
        if (item.id === categoryId) {
          return {
            ...item,
            product: item.product.map((item) => {
              if (item.id === id) {
                return { ...item, isSelected: !item.isSelected };
              } else {
                return item;
              }
            }),
          };
        } else {
          return item;
        }
      })
    );
  };
  const renderItemProduct = (id, isSelected, categoryId = 0) => {
    return (
      <Product
        id={id}
        isSelected={isSelected}
        selectProduct={selectProduct}
        selectCategoryProduct={selectCategoryProduct}
        categoryId={categoryId}
      />
    );
  };
  const renderItemCategory = (item) => {
    return (
      <CategoryCard
        item={item}
        renderItemProduct={renderItemProduct}
        allProducts={allProducts}
        categories={categories}
        addProductInCategory={addProductInCategory}
        moveProductCategoryFormAllProduct={moveProductCategoryFormAllProduct}
        removeCategoryFunc={removeCategory}
      />
    );
  };
  const renderItemReview = (item) => {
    return <Review item={item} />;
  };
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            
          </View>
          <View style={styles.body}>
            <View style={styles.productView}>
              <View style={styles.headerView}>
                <Ionicons name="cube-outline" size={30} color="black" />
                <Text style={styles.headerText}>Available Products</Text>
              </View>
              <View style={styles.productList}>
                <FlatList
                  data={allProducts}
                  renderItem={({ item }) =>
                    renderItemProduct(item.id, item.isSelected)
                  }
                  scrollEnabled={false}
                />
              </View>
            </View>
            <View style={styles.categoriesView}>
              <FlatList
                data={categories}
                renderItem={({ item }) => renderItemCategory(item)}
                scrollEnabled={false}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                addCategory();
              }}
              style={styles.categoryButton}
            >
              <Text style={styles.categoryButtonText}>Add Category</Text>
            </TouchableOpacity>
            <View style={styles.review}>
              <View style={styles.reviewHeader}>
                <Feather name="save" size={24} color="#074EE8" />
                <Text style={styles.reviewHeaderText}>Review</Text>
              </View>
              <View style={styles.reviewBody}>
                <Text style={styles.reviewBodyText}>
                  Available products: {allProducts.length}
                </Text>
                <Text style={styles.reviewBodyText}>
                  Categories: {categories.length}
                </Text>
                <View style={styles.reviewList}>
                  <FlatList
                    data={categories}
                    renderItem={({ item }) => renderItemReview(item)}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  header:{
    height:20
  },
  headerView: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  reviewHeader: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  productView: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1.5,
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  productList: {
    padding: 10,
  },
  textProduct: {
    marginLeft: 15,
  },
  categoryButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#074EE8",
    marginBottom: 20,
  },
  review: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.,
    elevation: 1.5,
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#074EE8",
  },
  categoryButtonText: {
    fontSize: 15,
  },
  reviewHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#074EE8",
  },
  reviewBody: {
    padding: 10,
  },
  reviewBodyText: {
    fontSize: 15,
    marginBottom: 5,
  },
  reviewList: {
    marginTop: 15,
  },
  categoriesView: {
    width: "100%",
  },
});
