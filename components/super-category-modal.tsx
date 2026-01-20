import { AppColors } from "@/constants/theme"
import { useSuperCategories } from "@/hooks/use-category-data"
import { useCategoryStore } from "@/store/category-store"
import type { Category } from "@/types/category"
import { Image } from "expo-image"
import React from "react"
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native"

const { width } = Dimensions.get("window")
const ITEM_SIZE = (width - 60) / 3

export const SuperCategoryModal: React.FC = () => {
  const {
    isModalVisible,
    selectedSuperCategory,
    setSelectedSuperCategory,
    setModalVisible,
    resetCategorySelection
  } = useCategoryStore()
  const { superCategories } = useSuperCategories()

  const handleSelectSuperCategory = (category: Category) => {
    const categoryName = category.categoryName || category.displayName || ""
    setSelectedSuperCategory(categoryName)
    resetCategorySelection()
    setModalVisible(false)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  return (
    <Modal
      visible={isModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={closeModal}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Browse Categories</Text>
              </View>

              <ScrollView
                contentContainerStyle={styles.categoriesGrid}
                showsVerticalScrollIndicator={false}
              >
                {superCategories.map((category, index) => {
                  const categoryName = category.categoryName || category.displayName || ""
                  const isSelected = selectedSuperCategory === categoryName

                  return (
                    <TouchableOpacity
                      key={category.categoryId || index}
                      style={styles.categoryItem}
                      onPress={() => handleSelectSuperCategory(category)}
                    >
                      <View style={styles.categoryImageContainer}>
                        <Image
                          source={{
                            uri: category.displayAssetUrl.startsWith("http")
                              ? category.displayAssetUrl
                              : `https://${category.displayAssetUrl}`
                          }}
                          style={[
                            styles.categoryImage,
                            {
                              borderWidth: 2,
                              borderColor: isSelected ? AppColors.deepForest : "transparent"
                            }
                          ]}
                          contentFit="cover"
                        />
                        {isSelected && (
                          <View style={styles.selectedBadge}>
                            <Text style={styles.checkmark}>✓</Text>
                          </View>
                        )}
                      </View>
                      <Text style={styles.categoryName} numberOfLines={2}>
                        {categoryName}
                      </Text>
                    </TouchableOpacity>
                  )
                })}
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end"
  },
  modalContent: {
    backgroundColor: AppColors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "80%",
    paddingBottom: 20
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: AppColors.text.primary
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: AppColors.background.light,
    justifyContent: "center",
    alignItems: "center"
  },
  closeButtonText: {
    fontSize: 20,
    color: AppColors.text.light
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 15,
    gap: 15
  },
  categoryItem: {
    width: ITEM_SIZE,
    alignItems: "center",
    marginBottom: 10
  },
  categoryImageContainer: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: ITEM_SIZE / 2,
    marginBottom: 8,
    position: "relative"
  },
  categoryImage: {
    width: "100%",
    borderRadius: ITEM_SIZE / 2,
    height: "100%",
    overflow: "hidden"
  },
  selectedBadge: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: AppColors.deepForest,
    justifyContent: "center",
    alignItems: "center"
  },
  checkmark: {
    color: AppColors.white,
    fontSize: 16,
    fontWeight: "bold"
  },
  categoryName: {
    fontSize: 13,
    fontWeight: "500",
    color: AppColors.text.primary,
    textAlign: "center",
    lineHeight: 18
  }
})
