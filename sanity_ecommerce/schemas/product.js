import { FiShoppingBag } from "react-icons/fi";

const hideUnless = (x, y) => {
    if(x) {
        return false
    } else if(y) {
        return false
    } else {
        return true
    }
}


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
            name: 'boolObj',
            title: 'Does This Product have Variants?',
            type: 'object',
            description: 'Choose one of the options below. If not a variant, leave blank',
            options: {
                collapsible: true,
                collapsed: true
            },
            fields: [
                {
                    title: 'Aesthetic and Dimensions Variants',
                    name: 'variantBool',
                    type: 'boolean',
                    hidden: ({ parent, value }) => !value && parent?.dimensionBool || !value && parent?.aestheticBool,
                    description: 'Colour/ Material/ finish'
                },
                {
                    title: 'Dimensions Variants',
                    name: 'dimensionBool',
                    type: 'boolean',
                    hidden: ({ parent, value }) => !value && parent?.variantBool || !value && parent?.aestheticBool,
                    description: 'Size / length / weight'
                },
                {
                    title: 'Aesthetic Variants Only',
                    name: 'aestheticBool',
                    type: 'boolean',
                    hidden: ({ parent, value }) => !value && parent?.dimensionBool || !value && parent?.variantBool,
                    description: 'Size / length / weight'
                },
                    
               
            ]
        },
        {
            name: 'bundle',
            title: 'If this Product is a Multi-pack, add Multipack sizes here',
            type: 'array',
            description: 'perfect for stickers!',
            of: [{type: 'string'}]
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
        
    
        {
            title: 'Aesthetic Variant Title',
            name: 'aestheticTitle',
            type: 'string',
            hidden: ({document}) => hideUnless(document?.boolObj?.variantBool, document?.boolObj?.aestheticBool),
            description: 'Colour / material / finish '
        },
        
        {
            title: 'Dimension Variant Title',
            name: 'dimensionTitle',
            type: 'string',
            hidden: ({document}) => hideUnless(document?.boolObj?.variantBool, document?.boolObj?.dimensionBool),
            description: 'Size / Weight / Length '
        },
        {
            title: 'Secondary Dimension Variant Title (leave blank if n/a)',
            name: 'secondDimensionTitle',
            type: 'string',
            hidden: ({document}) => hideUnless(document?.boolObj?.variantBool, document?.boolObj?.dimensionBool),
            description: 'Size / Weight / Length'
        },
       
        {
            title: 'Default Aesthetic Value',
            name: 'defaultAesthetic',
            hidden: ({document}) => hideUnless(document?.boolObj?.variantBool, document?.boolObj?.aestheticBool),
            type: 'string'
        },
        {
            name: 'defaultDimension',
            title: 'Default Dimension Value',
            description: 'Will appear under Dimension Variant Title',
            hidden: ({document}) => !document?.boolObj?.dimensionBool,
            type: 'string'
        },
        {
            title: 'Default Available Second Dimensions',
            name: 'defaultSecondDimensions',
            description: 'second dimension values that have the same first dimension',
            hidden: ({document}) => !document?.boolObj?.dimensionBool,
            type: 'array',
            of: [{  
                type: 'object',
                fields: [
                    
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
       
        {
            title: 'Default Available Dimensions',
            name: 'defaultDimensions',
            hidden: ({document}) => !document?.boolObj?.variantBool,
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
        {
            title: 'Aesthetic Variant Values',
            name: 'aestheticVariants',
            type: 'array',
            hidden: ({document}) => !document?.boolObj?.aestheticBool,
            of: [
                {
                title: 'Variant',
                type: 'aestheticVariant',
                },
            ],
        },
        {
            title: 'Variant Values',
            name: 'variants',
            type: 'array',
            hidden: ({document}) => !document?.boolObj?.variantBool,
            of: [
                {
                title: 'Variant',
                type: 'productVariant',
                },
            ],
        },
        
        {
            title: 'Dimension Variant Values',
            name: 'dimensionVariants',
            type: 'array',
            hidden: ({document}) => !document?.boolObj?.dimensionBool,
            of: [
                {
                title: 'Variant',
                type: 'dimensionVariant',
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