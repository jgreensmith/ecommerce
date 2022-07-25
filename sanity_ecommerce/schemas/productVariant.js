export default {
    title: 'Product variant',
    name: 'productVariant',
    type: 'object',
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string'
        },
        {
            title: 'Weight in grams',
            name: 'grams',
            type: 'number',
        },
        {
            title: 'Size',
            name: 'size',
            type: 'string',
        },
        {
            title: 'Price',
            name: 'price',
            type: 'number',
        },
        {
            name: 'images',
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
  