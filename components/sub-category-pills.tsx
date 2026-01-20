import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useCategoryStore } from '@/store/category-store';
import { AppColors } from '@/constants/theme';
import type { SubCategory } from '@/types/category';

interface SubCategoryPillsProps {
  subCategories: SubCategory[];
}

const ALL_SUBCATEGORY: SubCategory = {
  id: 'all',
  imageUrl: '',
  displayText: 'All',
};

export const SubCategoryPills: React.FC<SubCategoryPillsProps> = ({
  subCategories,
}) => {
  const selectedSubCategory = useCategoryStore(state => state.selectedSubCategory);
  const setSelectedSubCategory = useCategoryStore(state => state.setSelectedSubCategory);

  const allSubCategories = [ALL_SUBCATEGORY, ...subCategories];

  useEffect(() => {
    if (!selectedSubCategory) {
      setSelectedSubCategory(ALL_SUBCATEGORY);
    }
  }, [selectedSubCategory, setSelectedSubCategory]);

  const handleSubCategorySelect = (subCategory: SubCategory) => {
    setSelectedSubCategory(subCategory);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {allSubCategories.map((subCategory, index) => {
          const isSelected = selectedSubCategory?.id === subCategory.id;

          return (
            <TouchableOpacity
              key={subCategory.id || index}
              style={[styles.pill, isSelected && styles.pillActive]}
              onPress={() => handleSubCategorySelect(subCategory)}
            >
              <Text
                style={[styles.pillText, isSelected && styles.pillTextActive]}
              >
                {subCategory.displayText}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.floralWhite,
    paddingVertical: 12,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  pill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderColor: AppColors.border.light,
  },
  pillActive: {
    backgroundColor: AppColors.deepForest,
    borderColor: AppColors.deepForest,
  },
  pillText: {
    fontSize: 14,
    fontWeight: '500',
    color: AppColors.text.light,
  },
  pillTextActive: {
    color: AppColors.white,
    fontWeight: '600',
  },
});
