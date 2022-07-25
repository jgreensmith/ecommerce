export default {
    name: 'product',
    title: 'All Products',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'image',
            title: 'Image',
            type: 'array',
            of: [{ 
                type: 'image',
                options: {
                    hotspot: true,
                }
            }]
            
        },
        {
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{type: 'reference', to: {type: 'category'}}],
        },
        {
            title: 'Variants',
            name: 'variants',
            type: 'array',
            of: [
              {
                title: 'Variant',
                type: 'productVariant',
              },
            ],
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 90
            }
        },
        { 
            name: 'price',
            title: 'Price',
            type: 'number',
        },
        {
            name: 'body',
            title: 'Body',
            type: 'blockContent',
        },
        {
            name: 'seoDescription',
            title: 'Product Page Meta Description (SEO)',
            type: 'text',
            description: 'brief description of page for Search Engine Optimization'
        },
    ]
}