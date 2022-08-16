export default {
    title: 'Product variant',
    name: 'productVariant',
    type: 'object',
    fields: [
    
  
        {
            title: 'Aesthetic',
            name: 'title',
            type: 'string',
            description: 'e.g Green / Gloss'
        },
       
        {
            name: 'variantMainImage',
            title: 'Variant Image',
            type: 'image',
            options: {
                hotspot: true
            }
        },
        {
            name: 'variantImages',
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
       
        {
            title: 'Available Sizes',
            name: 'twoDimensions',
            type: 'array',
            of: [{  
                type: 'object',
                fields: [
                    {
                        name: 'firstDimension',
                        title: 'First Dimension - Size / weight / length',
                        description: 'Will appear under First Dimension title',
                        type: 'string'
                    },
                    {
                        name: 'secondDimension',
                        title: 'Second Dimension - Size / weight / length (leave blank if n/a)',
                        description: 'Will appear under Second Dimension title',
                        type: 'string'
                    },
                    {
                        name: 'sizePrice',
                        title: 'Price (if different)',
                        type: 'number'
                    },
                    {
                        name: 'sizeInventory',
                        title: 'Inventory',
                        type: 'number'
                    }
                ]
            }]
            
        },
        
        
    ],
    }
  