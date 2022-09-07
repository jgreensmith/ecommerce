import { FiShoppingBag } from "react-icons/fi";
import Variants from "../src/Variants";
import VariantTitle from "../src/VariantTitle";

// const hideUnless = (x, y) => {
//     if(x) {
//         return false
//     } else if(y) {
//         return false
//     } else {
//         return true
//     }
// }


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
            description: 'Choose one of the options below. If there are no variants, leave blank',
            options: {
                collapsible: true,
                collapsed: true
            },
            fields: [
                {
                    title: 'One Variant - e.g Colour',
                    name: 'oneVarBool',
                    type: 'boolean',
                    hidden: ({ parent, value }) => !value && parent?.twoVarBool || parent?.threeVarBool,
                    //description: 'Colour/ Material/ finish'
                },
                {
                    title: 'Two Variants - e.g Colour and Size',
                    name: 'twoVarBool',
                    type: 'boolean',
                    hidden: ({ parent, value }) => !value && parent?.oneVarBool || parent?.threeVarBool,
                    //description: 'Size / length / weight'
                },
                {
                    title: 'Three Variants - e.g Colour, Size and Weight',
                    name: 'threeVarBool',
                    type: 'boolean',
                    hidden: ({ parent, value }) => !value && parent?.oneVarBool || parent?.twoVarBool,
                    //description: 'Size / length / weight'
                },
                    
               
            ]
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
        {
            name: 'variantTitle',
            title: 'Variant Title',
            type: 'string',
        },
        {
            name: 'variants',
            title: 'Variants',
            type: 'array',
            description: 'drag default variant to top of array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'imageBool',
                            title: 'Would you like to add differrent images for this variant? - if left blank, default images will be used',
                            type: 'boolean',
                            description: 'recommended for aesthetic variants (colour/ finish)'
                        },
                        {
                            name: 'variantValue',
                            title: 'Variant Value',
                            type: 'string',
                        
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
                    ]
                    
                }
            ]
        },
        {
            name: 'primaryVarTitle',
            title: 'Primary Variant Title',
            type: 'string',
            //hidden: ({document}) => !document?.variantBool,
        },
        
        {
            name: 'primaryVariants',
            title: 'Primary variants',
            type: 'array',
            description: 'drag default variant to top of array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'imageBool',
                            title: 'Would you like to add differrent images for this variant? - if left blank, default images will be used',
                            type: 'boolean',
                            description: 'recommended for aesthetic variants (colour/ finish)'
                        },
                        {
                            name: 'variantValue',
                            title: 'Variant Value',
                            type: 'string',
                        
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
                            name: 'price',
                            title: 'Price of One Product (without symbol)',
                            type: 'number'
                        },
                        {
                            name: 'inventory',
                            title: 'Inventory',
                            type: 'number'
                        }
                    ]
                    
                }
            ]
        },
        
        {
            name: 'secondaryVarTitle',
            title: 'Secondary Variant Title',
            type: 'string',
        },
        {
            name: 'secondaryVariants',
            title: 'Secondary variants',
            type: 'array',
            of: [
                {
                    type: 'string'
                    
                }
            ]
        },
        {
            name: 'tertiaryVarTitle',
            title: 'Tertiary Variant Title',
            type: 'string',
        },
        {
            name: 'tertiaryVariants',
            title: 'Tertiary variants',
            type: 'array',
            of: [
                {
                    type: 'string'
                    
                }
            ]
        },
        {
            name: 'variantComboList',
            title: 'Manage Inventory',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'newValue',
                            type: 'string',
                            //readOnly: true,
                            inputComponent: VariantTitle
                        },
                        {
                            name: 'varSelect',
                            title: 'Select Variant Combination',
                            type: 'string',
                            inputComponent: Variants 
                        },
                        {
                            name: 'price',
                            title: 'Price of One Product (without symbol)',
                            type: 'number'
                        },
                        {
                            name: 'inventory',
                            title: 'Inventory',
                            type: 'number'
                        }
                    ]
                }
            ],
            
        }
        

    ]
}