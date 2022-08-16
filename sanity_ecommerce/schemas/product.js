import { FiShoppingBag } from "react-icons/fi";


export default {
    name: 'product',
    title: 'All Products',
    type: 'document',
    icon: FiShoppingBag,
    fields: [
        {
            name: 'name',
            title: 'Product title',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'colorBool',
            title: 'Is this product a Colour variant?',
            type: 'boolean', 
        },
        {
            name: 'color',
            title: 'Colour',
            type: 'string',
            hidden: ({document}) => !document?.colorBool,
        },
        {
            name: 'colorRef',
            title: 'Colour Ref',
            type: 'array',
            hidden: ({document}) => !document?.colorBool,
            of: [{type: 'reference', to: {type: 'product'}}],
            
        },
        {
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'addVariantsBool',
            title: 'Add Product Variants?',
            type: 'boolean'
        },
        {
            name: 'images',
            title: 'Images',
            type: 'array',
            description: 'Must have at least one alternative image',
            validation: Rule => Rule.required(),
            //hidden: ({document}) => document?.addVariantsBool,
            of: [
                
                { 
                    type: 'image',
                    options: {
                        hotspot: true,
                    }
                },
                        
        ]
            
        },
       
        {
            name: 'categories',
            title: 'Categories',
            type: 'array',
            validation: Rule => Rule.required(),
            of: [{type: 'reference', to: {type: 'category'}}],
        }, 
        // {
        //     title: 'Default variant',
        //     name: 'defaultProductVariant',
        //     type: 'productVariant',
        //     validation: Rule => Rule.required(),
        //     hidden: ({document}) => !document?.addVariantsBool,    
        // },
        {
            title: 'Variants',
            name: 'variants',
            type: 'array',
            //validation: Rule => Rule.required(),
            hidden: ({document}) => !document?.addVariantsBool,
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