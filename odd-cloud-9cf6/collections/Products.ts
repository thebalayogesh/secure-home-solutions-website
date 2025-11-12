import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "Product Name",
      type: "text",
      required: true,
    },
  ],
};
