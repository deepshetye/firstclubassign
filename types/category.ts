export interface Category {
  categoryType: string;
  ctaId: string;
  ctaType?: string;
  pageType?: string;
  displayAssetUrl: string;
  displayName?: string;
  categoryName?: string;
  rank: number;
  categoryId: string;
  widgetType: string;
}

export interface SuperCategoryComponent {
  instanceId: string;
  name: string;
  data: {
    colCount: number;
    rank: number;
    rowCount: number;
    widgetName: string;
    itemType: string;
    widgetVariant: string;
    sticky: boolean;
    title: string;
    widgetType: string;
  };
  componentData: Category[];
  widgetGroup: {
    widgetInstanceId: string;
  };
  layoutGroup: {
    layoutInstanceId: string;
  };
}

export interface SuperCategoriesData {
  body: {
    pageResponseDto: {
      name: string;
      pageInstanceId: string;
      componentMap: {
        [key: string]: SuperCategoryComponent;
      };
      widgetGroupToComponentMap: {
        [key: string]: string[];
      };
      layoutGroupToWidgetMap: {
        [key: string]: Array<{
          widgetInstanceId: string;
        }>;
      };
      layoutGroupToComponentMap: {
        [key: string]: string[];
      };
    };
  };
  success: boolean;
}

export interface SubCategory {
  id: string;
  imageUrl: string;
  displayText: string;
}

export interface Product {
  id: string;
  name: string;
  displayName: string;
  weight: string;
  description: string;
  imageUrl: string;
  price: number;
  originalPrice: number;
  discount?: number;
  tag?: string;
}

export interface ListingsData {
  body: {
    name: string;
    pageInstanceId: string;
    componentMap: {
      [key: string]: {
        instanceId: string;
        name: string;
        data: any;
        componentData: any;
        widgetGroup?: {
          widgetInstanceId: string;
        };
        layoutGroup?: {
          layoutInstanceId: string;
        };
      };
    };
  };
  success?: boolean;
}
