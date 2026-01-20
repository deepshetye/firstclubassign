import { AppColors } from "@/constants/theme"
import { useCategoryStore } from "@/store/category-store"
import type { Category } from "@/types/category"
import React, { useEffect, useRef } from "react"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface CategoryTabsProps {
  categories: Category[]
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories }) => {
  const selectedCategory = useCategoryStore(state => state.selectedCategory)
  const setSelectedCategory = useCategoryStore(state => state.setSelectedCategory)
  const scrollViewRef = useRef<ScrollView>(null)

  useEffect(() => {
    if (!selectedCategory && categories.length > 0) {
      setSelectedCategory(categories[0])
    }
  }, [categories, selectedCategory, setSelectedCategory])

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category)
  }

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category, index) => {
          const categoryName = category.displayName || category.categoryName || ""
          const isSelected = selectedCategory?.categoryId === category.categoryId

          return (
            <TouchableOpacity
              key={category.categoryId || index}
              style={[styles.tab, isSelected && styles.tabActive]}
              onPress={() => handleCategorySelect(category)}
            >
              <Text style={[styles.tabText, isSelected && styles.tabTextActive]}>
                {categoryName}
              </Text>
              {isSelected && <View style={styles.tabIndicator} />}
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.floralWhite,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.border.light
  },
  scrollContent: {
    paddingHorizontal: 4,
    gap: 8
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    position: "relative"
  },
  tabActive: {
    // Active state styling
  },
  tabText: {
    fontSize: 15,
    fontWeight: "500",
    color: AppColors.text.light
  },
  tabTextActive: {
    color: AppColors.text.primary,
    fontWeight: "600"
  },
  tabIndicator: {
    position: "absolute",
    bottom: 0,
    left: 16,
    right: 16,
    height: 3,
    backgroundColor: AppColors.deepForest,
    borderRadius: 2
  }
})
