import listingsData from '@/assets/json/listings.json';
import type { ListingsData, Product, SubCategory } from '@/types/category';
import { useMemo } from 'react';

export const useListingsData = () => {
  const data = listingsData as ListingsData;

  const subCategories = useMemo<SubCategory[]>(() => {
    const componentMap = data.body.componentMap;
    const subCategoryComponent = Object.values(componentMap).find(
      (component) => component.name === 'SubcategoryNavigationComponent'
    );

    if (
      subCategoryComponent &&
      subCategoryComponent.componentData?.subcategories
    ) {
      return subCategoryComponent.componentData.subcategories;
    }

    return [];
  }, []);

  const products = useMemo<Product[]>(() => {
    const componentMap = data.body.componentMap;
    const productComponent = Object.values(componentMap).find(
      (component) => component.name === 'ProductListingComponent'
    );

    if (
      productComponent &&
      productComponent.componentData?.productListings
    ) {
      return productComponent.componentData.productListings.map(
        (product: any) => ({
          id: product.fsn || product.id || product.listingId || '',
          name: product.name || product.displayName || '',
          displayName: product.displayName || product.name || '',
          weight: product.quantity || product.grammage || product.weight || '',
          description:
            product.markerTextCallOut?.callOut ||
            product.description ||
            '',
          imageUrl: product.displayAssetUrl || product.imageUrl || '',
          price:
            product.price?.oneTimePrice?.memberPrice ||
            product.price?.mrp ||
            0,
          originalPrice: product.price?.mrp || 0,
          discount: product.discount,
          tag:
            product.markerImageCallOut?.callOut ||
            product.tag ||
            product.badge,
        })
      );
    }

    return [];
  }, []);

  return {
    subCategories,
    products,
  };
};
