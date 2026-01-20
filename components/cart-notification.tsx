import { AppColors } from "@/constants/theme"
import { useCategoryStore } from "@/store/category-store"
import React, { useEffect, useRef } from "react"
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const { width } = Dimensions.get("window")

export const CartNotification: React.FC = () => {
  const { showCartNotification, cartItems, totalSavings } = useCategoryStore()
  const slideAnim = useRef(new Animated.Value(100)).current

  useEffect(() => {
    if (showCartNotification) {
      // Slide up
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 7
      }).start()
    } else {
      // Slide down
      Animated.spring(slideAnim, {
        toValue: 100,
        useNativeDriver: true,
        tension: 50,
        friction: 7
      }).start()
    }
  }, [showCartNotification, slideAnim])

  if (!showCartNotification) {
    return null
  }

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnim }]
        }
      ]}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View style={styles.cartIcon}>
            <Text style={styles.cartIconText}>🛒</Text>
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.itemText}>
            {itemCount} Item{itemCount > 1 ? "s" : ""} added
          </Text>
          {totalSavings > 0 && (
            <Text style={styles.savingsText}>
              You saved ₹ {totalSavings.toFixed(0)} on this order
            </Text>
          )}
        </View>

        <TouchableOpacity style={styles.viewCartButton}>
          <Text style={styles.viewCartText}>View Cart</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    zIndex: 1000
  },
  content: {
    backgroundColor: AppColors.white,
    borderRadius: 50,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6
  },
  iconContainer: {
    marginRight: 12
  },
  cartIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: AppColors.accent.light,
    justifyContent: "center",
    alignItems: "center"
  },
  cartIconText: {
    fontSize: 20
  },
  textContainer: {
    flex: 1,
    marginRight: 12
  },
  itemText: {
    fontSize: 15,
    fontWeight: "600",
    color: AppColors.text.primary,
    marginBottom: 2
  },
  savingsText: {
    fontSize: 13,
    color: AppColors.text.light
  },
  viewCartButton: {
    backgroundColor: AppColors.deepForest,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24
  },
  viewCartText: {
    color: AppColors.white,
    fontSize: 14,
    fontWeight: "600"
  }
})
