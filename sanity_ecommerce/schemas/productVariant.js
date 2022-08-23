export default {
    title: 'Product variant',
    name: 'productVariant',
    type: 'object',
    fields: [
        {
            name: 'imageBool',
            title: 'Would you like to add differrent images for this variant?',
            type: 'boolean',
            description: 'recommended for aesthetic variants (colour/ finish)'
        },
  
        {
            title: 'Parent Variant Value',
            name: 'title',
            type: 'string',
        },
        {
            name: 'price',
            title: 'Price (if different)',
            type: 'number'
        },
        {
            name: 'inventory',
            title: 'Inventory',
            type: 'number'
        },
       
        {
            name: 'variantMainImage',
            title: 'Variant Main Image',
            type: 'image',
            hidden: ({parent}) => !parent?.imageBool,
            validation: Rule => Rule.custom((field, context) => (context.parent.imageBool && field === undefined) ? "This field must not be empty." : true),
            options: {
                hotspot: true
            }
        },
        {
            name: 'variantImages',
            title: 'Images',
            type: 'array',
            hidden: ({parent}) => !parent?.imageBool,
            validation: Rule => Rule.custom((field, context) => (context.parent.imageBool && field === undefined) ? "This field must not be empty." : true),
            description: 'must have a least one alternative image',
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
            title: 'Optional Child Variant - add up to two more variant types',
            name: 'childArray',
            type: 'array',
            of: [{  
                type: 'object',
                fields: [
                    {
                        name: 'childA',
                        title: 'Child Variant Value - A',
                        description: 'Will appear under First Dimension title',
                        type: 'string'
                    },
                    {
                        name: 'childB',
                        title: 'Child Variant Value - B (leave blank if n/a)',
                        description: 'Will appear under Second Dimension title',
                        type: 'string'
                    },
                    {
                        name: 'price',
                        title: 'Price (if different)',
                        type: 'number'
                    },
                    {
                        name: 'inventory',
                        title: 'Inventory',
                        type: 'number'
                    }
                ]
            }]
            
        },
        
        
    ],
    }
  