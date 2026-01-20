import { AppColors } from "@/constants/theme"
import { useSuperCategories } from "@/hooks/use-category-data"
import { useListingsData } from "@/hooks/use-listings-data"
import { useCategoryStore } from "@/store/category-store"
import React, { useEffect, useMemo } from "react"
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { CartNotification } from "./cart-notification"
import { CategoryTabs } from "./category-tabs"
import { ProductGrid } from "./product-grid"
import { SubCategoryPills } from "./sub-category-pills"
import { SuperCategoryModal } from "./super-category-modal"

export const CategoryListingPage: React.FC = () => {
  const { selectedSuperCategory, setSelectedSuperCategory, setModalVisible } = useCategoryStore()
  const { superCategories, getCategoriesForSuperCategory } = useSuperCategories()
  const { subCategories, products } = useListingsData()

  useEffect(() => {
    if (!selectedSuperCategory && superCategories.length > 0) {
      const defaultCategory = superCategories.find(
        cat => (cat.categoryName || cat.displayName) === "Fruits & Vegetables"
      )
      if (defaultCategory) {
        const categoryName = defaultCategory.categoryName || defaultCategory.displayName || ""
        setSelectedSuperCategory(categoryName)
      }
    }
  }, [superCategories, selectedSuperCategory, setSelectedSuperCategory])

  const categories = useMemo(() => {
    if (!selectedSuperCategory) return []
    return getCategoriesForSuperCategory(selectedSuperCategory)
  }, [selectedSuperCategory, getCategoriesForSuperCategory])

  const handleSuperCategoryPress = () => {
    setModalVisible(true)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.superCategoryButton} onPress={handleSuperCategoryPress}>
          <Text style={styles.superCategoryText}>{selectedSuperCategory || "Select Category"}</Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

      {categories.length > 0 && <CategoryTabs categories={categories} />}

      {subCategories.length > 0 && <SubCategoryPills subCategories={subCategories} />}

      <ProductGrid products={products} />

      <SuperCategoryModal />

      <CartNotification />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.floralWhite
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: AppColors.floralWhite
  },
  superCategoryButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  superCategoryText: {
    fontSize: 18,
    fontWeight: "600",
    color: AppColors.text.primary,
    marginRight: 8
  },
  dropdownIcon: {
    fontSize: 12,
    color: AppColors.text.light
  },
  searchButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  searchIcon: {
    fontSize: 20
  }
})
