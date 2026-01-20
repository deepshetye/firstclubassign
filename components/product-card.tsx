import { AppColors } from "@/constants/theme"
import type { Product } from "@/types/category"
import { useCategoryStore } from "@/store/category-store"
import { Image } from "expo-image"
import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface ProductCardProps {
  product: Product
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCategoryStore()
  const hasDiscount = product.originalPrice > product.price
  const discountPercentage = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        {product.tag && (
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>{product.tag}</Text>
          </View>
        )}
        {hasDiscount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{discountPercentage}× Bigger</Text>
          </View>
        )}
        <Image
          source={{
            uri: product.imageUrl.startsWith("http")
              ? product.imageUrl
              : `https://${product.imageUrl}`
          }}
          style={styles.productImage}
          contentFit="cover"
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.weight}>{product.weight}</Text>
        <Text style={styles.productName} numberOfLines={2}>
          {product.displayName || product.name}
        </Text>
        <Text style={styles.description} numberOfLines={1}>
          {product.description}
        </Text>

        <View style={styles.priceContainer}>
          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{product.price}</Text>
            {hasDiscount && <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>}
          </View>
          <TouchableOpacity style={styles.addButton} onPress={() => addToCart(product)}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.white,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: AppColors.background.light,
    position: "relative"
  },
  productImage: {
    width: "100%",
    height: "100%"
  },
  tagContainer: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: AppColors.accent.success,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    zIndex: 1
  },
  tagText: {
    color: AppColors.white,
    fontSize: 10,
    fontWeight: "600"
  },
  discountBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: AppColors.accent.light,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    zIndex: 1
  },
  discountText: {
    color: AppColors.deepForest,
    fontSize: 11,
    fontWeight: "600"
  },
  infoContainer: {
    padding: 12
  },
  weight: {
    fontSize: 10,
    fontWeight: "600",
    color: AppColors.text.light,
    marginBottom: 4
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    color: AppColors.text.primary,
    marginBottom: 2,
    lineHeight: 18
  },
  description: {
    fontSize: 12,
    color: AppColors.text.muted,
    marginBottom: 8
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: AppColors.text.primary
  },
  originalPrice: {
    fontSize: 13,
    fontWeight: "400",
    color: AppColors.text.muted,
    textDecorationLine: "line-through"
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: AppColors.accent.light,
    justifyContent: "center",
    alignItems: "center"
  },
  addButtonText: {
    fontSize: 20,
    // fontWeight: "600",
    color: AppColors.deepForest
  }
})
