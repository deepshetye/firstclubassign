import { AppColors } from "@/constants/theme"
import { useCategoryStore } from "@/store/category-store"
import type { Product } from "@/types/category"
import { Image } from "expo-image"
import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface ProductCardProps {
  product: Product
}

const CARD_WIDTH = 175
const CARD_PADDING = 6
const IMAGE_SIZE = CARD_WIDTH - CARD_PADDING * 2
const BADGE_HEIGHT = 22
const BADGE_WIDTH = 85
const CORNER_RADIUS = 12

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCategoryStore()

  const hasDiscount = product.originalPrice > product.price
  const productImage = {
    uri: `https://www.shutterstock.com/image-photo/ndian-traditional-cuisine-dal-fry-600nw-2512047949.jpg`
  }

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        {product.tag && (
          <View style={styles.cutoutContainer}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{product.tag}</Text>
            </View>

            <View style={[styles.concaveBox, styles.concaveRight]}>
              <View style={styles.concaveWindow}>
                <Image
                  source={productImage}
                  style={[
                    styles.maskedImage,
                    {
                      top: 0,
                      left: -BADGE_WIDTH
                    }
                  ]}
                  contentFit="cover"
                />
              </View>
            </View>

            <View style={[styles.concaveBox, styles.concaveBottom]}>
              <View style={styles.concaveWindow}>
                <Image
                  source={productImage}
                  style={[
                    styles.maskedImage,
                    {
                      top: -BADGE_HEIGHT,
                      left: 0
                    }
                  ]}
                  contentFit="cover"
                />
              </View>
            </View>
          </View>
        )}

        <Image source={productImage} style={styles.productImage} contentFit="cover" />
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
    marginHorizontal: "auto",
    width: CARD_WIDTH,
    backgroundColor: AppColors.white,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    padding: CARD_PADDING,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2
  },
  imageContainer: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: AppColors.background.light,
    position: "relative"
  },
  productImage: {
    width: "100%",
    height: "100%"
  },
  cutoutContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: BADGE_WIDTH + CORNER_RADIUS,
    height: BADGE_HEIGHT + CORNER_RADIUS,
    zIndex: 1
  },
  badge: {
    width: BADGE_WIDTH,
    height: BADGE_HEIGHT,
    backgroundColor: AppColors.white,
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: CORNER_RADIUS,
    zIndex: 2
  },
  badgeText: {
    color: "#4CAF50",
    fontWeight: "700",
    fontSize: 10
  },
  concaveBox: {
    position: "absolute",
    width: CORNER_RADIUS,
    height: CORNER_RADIUS,
    backgroundColor: AppColors.white,
    zIndex: 1
  },
  concaveRight: {
    top: 0,
    left: BADGE_WIDTH
  },
  concaveBottom: {
    top: BADGE_HEIGHT,
    left: 0
  },
  concaveWindow: {
    width: CORNER_RADIUS,
    height: CORNER_RADIUS,
    borderTopLeftRadius: CORNER_RADIUS,
    overflow: "hidden",
    backgroundColor: AppColors.white
  },
  maskedImage: {
    position: "absolute",
    width: IMAGE_SIZE,
    height: IMAGE_SIZE
  },
  infoContainer: {
    height: 140,
    padding: 6
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
    marginBottom: 8,
    flex: 1
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  priceRow: {},
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
    color: AppColors.deepForest
  }
})
