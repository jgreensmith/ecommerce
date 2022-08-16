export default {
    title: 'Aesthetic variant',
    name: 'aestheticVariant',
    type: 'object',
    fields: [
      
        {
            title: 'Aesthetic',
            name: 'aestheticTitle',
            type: 'string',
            description: 'e.g Green / Gloss'
        },
        {
            title: 'Inventory',
            name: 'aestheticInventory',
            type: 'number',
            description: 'How much of this product variant do you have in stock?'
        },
        
        {
            title: 'Price (if different)',
            name: 'aestheticPrice',
            type: 'number',
        },
        {
            name: 'aestheticVariantMainImage',
            title: 'Variant Image',
            type: 'image',
            options: {
                hotspot: true
            }
        },
        {
            name: 'aestheticVariantImages',
            title: 'Images',
            type: 'array',
            of: [
              {
                type: 'image',
                options: {
                  hotspot: true,
                },
              },
            ],
        },
       
        
    ],
    }
  