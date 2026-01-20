import type { Product } from "@/types/category"
import React from "react"
import { Dimensions, FlatList, StyleSheet, View } from "react-native"
import { ProductCard } from "./product-card"

interface ProductGridProps {
  products: Product[]
}

const { width } = Dimensions.get("window")
const CARD_MARGIN = 4
const CONTAINER_PADDING = 16
const CARD_WIDTH = (width - CONTAINER_PADDING * 2 - CARD_MARGIN) / 2

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.cardWrapper}>
      <ProductCard product={item} />
    </View>
  )

  return (
    <FlatList
      data={products}
      renderItem={renderProduct}
      keyExtractor={(item, index) => item.id || index.toString()}
      numColumns={2}
      contentContainerStyle={styles.gridContainer}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={styles.columnWrapper}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={5}
      initialNumToRender={10}
      updateCellsBatchingPeriod={50}
    />
  )
}

const styles = StyleSheet.create({
  gridContainer: {
    padding: CONTAINER_PADDING
  },
  columnWrapper: {
    justifyContent: "space-between"
  },
  cardWrapper: {
    width: CARD_WIDTH
  }
})
