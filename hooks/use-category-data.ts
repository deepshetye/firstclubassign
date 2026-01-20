import superCategoriesData from '@/assets/json/super_categories.json';
import type {
  Category,
  SuperCategoriesData,
} from '@/types/category';
import { useMemo } from 'react';

export const useSuperCategories = () => {
  const data = superCategoriesData as SuperCategoriesData;

  const superCategories = useMemo(() => {
    const componentMap = data.body.pageResponseDto.componentMap;
    const leftPanelComponent = Object.values(componentMap).find(
      (component) => component.name === 'WB-Category Tab Left Panel V3Component'
    );

    return leftPanelComponent?.componentData || [];
  }, []);

  const getCategoriesForSuperCategory = (
    superCategoryName: string
  ): Category[] => {
    const componentMap = data.body.pageResponseDto.componentMap;
    const component = Object.values(componentMap).find(
      (comp) => comp.data.title === superCategoryName
    );

    return component?.componentData || [];
  };

  return {
    superCategories,
    getCategoriesForSuperCategory,
  };
};
