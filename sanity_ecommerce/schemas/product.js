import { FiShoppingBag } from "react-icons/fi";
import Variants from "../src/Variants";

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
            description: 'Choose one of the options below. If there are no variants, leave blank',
            options: {
                collapsible: true,
                collapsed: false
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
            //validation: Rule => Rule.required(),
            of: [{type: 'reference', to: {type: 'category'}}],
        },    
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            validation: Rule => Rule.required(),
            options: {
                source: 'name',
                maxLength: 90
            }
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
            description: 'if this product has variants, this will be the default price'
            //hidden: ({document}) => document?.boolObj?.oneVarBool || document?.boolObj?.twoVarBool || document?.boolObj?.threeVarBool
        },
        {
            name: 'inventory',
            title: 'Inventory',
            type: 'number',
            hidden: ({document}) => document?.boolObj?.oneVarBool || document?.boolObj?.twoVarBool || document?.boolObj?.threeVarBool
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
            hidden: ({document}) => !document?.boolObj?.oneVarBool,
            type: 'string',
        },
        {
            name: 'variants',
            title: 'Variants',
            type: 'array',
            hidden: ({document}) => !document?.boolObj?.oneVarBool,
            description: 'make sure to include the default variant! - drag default variant to top of array',
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
                            type: 'number',
                            description: 'leave blank to use default price'
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
            name: 'primaryVarTitle',
            title: 'Primary Variant Title',
            type: 'string',
            hidden: ({document}) => hideUnless(document?.boolObj?.twoVarBool, document?.boolObj?.threeVarBool)
        },
        
        {
            name: 'primaryVariants',
            title: 'Primary variants',
            type: 'array',
            hidden: ({document}) => hideUnless(document?.boolObj?.twoVarBool, document?.boolObj?.threeVarBool),
            description: 'make sure to include the default variant! - drag default variant to top of array',
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
            name: 'secondaryVarTitle',
            title: 'Secondary Variant Title',
            type: 'string',
            hidden: ({document}) => hideUnless(document?.boolObj?.twoVarBool, document?.boolObj?.threeVarBool)
        },
        {
            name: 'secondaryVariants',
            title: 'Secondary variants',
            type: 'array',
            hidden: ({document}) => hideUnless(document?.boolObj?.twoVarBool, document?.boolObj?.threeVarBool),
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
            hidden: ({document}) => !document?.boolObj?.threeVarBool
        },
        {
            name: 'tertiaryVariants',
            title: 'Tertiary variants',
            type: 'array',
            hidden: ({document}) => !document?.boolObj?.threeVarBool,
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
            hidden: ({document}) => hideUnless(document?.boolObj?.twoVarBool, document?.boolObj?.threeVarBool),
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'varSelect',
                            title: 'Select Variant Combination',
                            type: 'string',
                            inputComponent: Variants 
                        },
                        {
                            name: 'price',
                            title: 'Price of One Product (without symbol)',
                            type: 'number',
                            description: 'leave blank to use default price'
                        },
                        {
                            name: 'inventory',
                            title: 'Inventory',
                            type: 'number'
                        }
                    ],
                    preview : {
                        select: {
                            title: 'varSelect',
                            inventory: 'inventory'
                        },
                        prepare(selection) {
                            const parsed = JSON.parse(selection.title)
                            const variantTitle = `${parsed.priVar}, ${parsed.secVar}${parsed.tertVar ? ', ' : ''}${parsed.tertVar ? parsed.tertVar : ''}`
                            return {
                                title: variantTitle,
                                subtitle: `${selection.inventory} in stock`
                            }
                        }
                    }
                }
            ],
            
        },
        {
            name: 'personalisationBool',
            title: 'Enable Optional Personalistion Text Box',
            type: 'boolean',
            
        },
        {
            name: 'personalisationTitle',
            title: 'Personalisation Box Title',
            type: 'string',
            description: 'describe what you would like the customer to put in the personalisation box',
            hidden: ({document}) => !document?.personalisationBool
        }
        

    ]
}