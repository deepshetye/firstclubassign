import { AppColors } from "@/constants/theme"
import { useCategoryStore } from "@/store/category-store"
import type { Product } from "@/types/category"
import { Image } from "expo-image"
import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface ProductCardProps {
  product: Product
}

const CARD_PADDING = 6
const BADGE_HEIGHT = 22
const CORNER_RADIUS = 12

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCategoryStore()
  const [cardWidth, setCardWidth] = React.useState(0)

  const hasDiscount = product.originalPrice > product.price
  const imageSize = cardWidth - CARD_PADDING * 2
  const badgeWidth = Math.min(cardWidth * 0.5, 85) // 50% of card width or max 85

  // Handle image URL with or without http prefix
  const imageUrl = product.imageUrl?.startsWith("http")
    ? product.imageUrl
    : `https://${product.imageUrl}`

  return (
    <View
      style={styles.card}
      onLayout={event => {
        const { width } = event.nativeEvent.layout
        setCardWidth(width)
      }}
    >
      <View style={[styles.imageContainer, { width: imageSize, height: imageSize }]}>
        {product.tag && cardWidth > 0 && (
          <View
            style={[
              styles.cutoutContainer,
              { width: badgeWidth + CORNER_RADIUS, height: BADGE_HEIGHT + CORNER_RADIUS }
            ]}
          >
            <View style={[styles.badge, { width: badgeWidth, height: BADGE_HEIGHT }]}>
              <Text style={styles.badgeText}>{product.tag}</Text>
            </View>

            <View style={[styles.concaveBox, styles.concaveRight, { left: badgeWidth }]}>
              <View style={styles.concaveWindow}>
                <Image
                  source={{
                    uri: "https://img.freepik.com/premium-photo/restaurant-style-dal-tadka-tempered-with-ghee-spices-this-recipe-makes-great-meal-with-boiled-rice_466689-76432.jpg"
                  }}
                  style={[
                    styles.maskedImage,
                    {
                      width: imageSize,
                      height: imageSize,
                      top: 0,
                      left: -badgeWidth
                    }
                  ]}
                  contentFit="cover"
                />
              </View>
            </View>

            <View style={[styles.concaveBox, styles.concaveBottom]}>
              <View style={styles.concaveWindow}>
                <Image
                  source={{
                    uri: "https://img.freepik.com/premium-photo/restaurant-style-dal-tadka-tempered-with-ghee-spices-this-recipe-makes-great-meal-with-boiled-rice_466689-76432.jpg"
                  }}
                  style={[
                    styles.maskedImage,
                    {
                      width: imageSize,
                      height: imageSize,
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

        <Image
          source={{
            uri: "https://img.freepik.com/premium-photo/restaurant-style-dal-tadka-tempered-with-ghee-spices-this-recipe-makes-great-meal-with-boiled-rice_466689-76432.jpg"
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
    flex: 1,
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
    zIndex: 1
  },
  badge: {
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
    top: 0
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
    position: "absolute"
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
