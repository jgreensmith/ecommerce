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
            name: 'variantBool',
            title: 'Does This Product have Variants?',
            type: 'boolean'
        },
        // {
        //     name: 'boolObj',
        //     title: 'Does This Product have Variants?',
        //     type: 'object',
        //     description: 'Choose one of the options below. If not a variant, leave blank',
        //     options: {
        //         collapsible: true,
        //         collapsed: true
        //     },
        //     fields: [
        //         {
        //             title: 'Aesthetic and Dimensions Variants',
        //             name: 'variantBool',
        //             type: 'boolean',
        //             hidden: ({ parent, value }) => !value && parent?.dimensionBool || !value && parent?.aestheticBool,
        //             description: 'Colour/ Material/ finish'
        //         },
        //         {
        //             title: 'Dimensions Variants',
        //             name: 'dimensionBool',
        //             type: 'boolean',
        //             hidden: ({ parent, value }) => !value && parent?.variantBool || !value && parent?.aestheticBool,
        //             description: 'Size / length / weight'
        //         },
        //         {
        //             title: 'Aesthetic Variants Only',
        //             name: 'aestheticBool',
        //             type: 'boolean',
        //             hidden: ({ parent, value }) => !value && parent?.dimensionBool || !value && parent?.variantBool,
        //             description: 'Size / length / weight'
        //         },
                    
               
        //     ]
        // },
        // {
        //     name: 'bundle',
        //     title: 'If this Product is a Multi-pack, add Multipack sizes here',
        //     type: 'array',
        //     description: 'perfect for stickers!',
        //     of: [{type: 'string'}]
        // },
        
       
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
        
    
        // {
        //     title: 'Aesthetic Variant Title',
        //     name: 'aestheticTitle',
        //     type: 'string',
        //     hidden: ({document}) => hideUnless(document?.boolObj?.variantBool, document?.boolObj?.aestheticBool),
        //     description: 'Colour / material / finish '
        // },
        // {
        //     title: 'Default Aesthetic Value',
        //     name: 'defaultAesthetic',
        //     hidden: ({document}) => hideUnless(document?.boolObj?.variantBool, document?.boolObj?.aestheticBool),
        //     type: 'string'
        // },
        
        // {
        //     title: 'Dimension Variant Title',
        //     name: 'dimensionTitle',
        //     type: 'string',
        //     hidden: ({document}) => hideUnless(document?.boolObj?.variantBool, document?.boolObj?.dimensionBool),
        //     description: 'Size / Weight / Length '
        // },
        // {
        //     name: 'defaultDimension',
        //     title: 'Default Dimension Value',
        //     description: 'Will appear under Dimension Variant Title',
        //     hidden: ({document}) => !document?.boolObj?.dimensionBool,
        //     type: 'string'
        // },
        // {
        //     title: 'Secondary Dimension Variant Title (leave blank if n/a)',
        //     name: 'secondDimensionTitle',
        //     type: 'string',
        //     hidden: ({document}) => hideUnless(document?.boolObj?.variantBool, document?.boolObj?.dimensionBool),
        //     description: 'Size / Weight / Length'
        // },
       
        // {
        //     title: 'Default Available Second Dimensions',
        //     name: 'defaultSecondDimensions',
        //     hidden: ({document}) => !document?.boolObj?.dimensionBool,
        //     type: 'array',
        //     of: [{  
        //         type: 'object',
        //         fields: [
                    
        //             {
        //                 name: 'secondDimension',
        //                 title: 'Second Dimension - Size / weight / length (leave blank if n/a)',
        //                 description: 'Will appear under Second Dimension title',
        //                 type: 'string'
        //             },
        //             {
        //                 name: 'sizePrice',
        //                 title: 'Price (if different)',
        //                 type: 'number'
        //             },
        //             {
        //                 name: 'sizeInventory',
        //                 title: 'Inventory',
        //                 type: 'number'
        //             }
        //         ]
        //     }]
            
        // },
       
        // {
        //     title: 'Default Available Dimensions',
        //     name: 'defaultDimensions',
        //     hidden: ({document}) => !document?.boolObj?.variantBool,
        //     type: 'array',
        //     of: [{  
        //         type: 'object',
        //         fields: [
        //             {
        //                 name: 'firstDimension',
        //                 title: 'First Dimension - Size / weight / length',
        //                 description: 'Will appear under First Dimension title',
        //                 type: 'string'
        //             },
        //             {
        //                 name: 'secondDimension',
        //                 title: 'Second Dimension - Size / weight / length (leave blank if n/a)',
        //                 description: 'Will appear under Second Dimension title',
        //                 type: 'string'
        //             },
        //             {
        //                 name: 'sizePrice',
        //                 title: 'Price (if different)',
        //                 type: 'number'
        //             },
        //             {
        //                 name: 'sizeInventory',
        //                 title: 'Inventory',
        //                 type: 'number'
        //             }
        //         ]
        //     }]
            
        // },
        // {
        //     title: 'Aesthetic Variant Values',
        //     name: 'aestheticVariants',
        //     type: 'array',
        //     hidden: ({document}) => !document?.boolObj?.aestheticBool,
        //     of: [
        //         {
        //         title: 'Variant',
        //         type: 'aestheticVariant',
        //         },
        //     ],
        // },
        // {
        //     title:  'Parent Variant Title',
        //     name: 'parentTitle',
        //     type: 'string',
        //     hidden: ({document}) => !document?.variantBool,
        //     validation: Rule => Rule.custom((field, context) => (context.document.variantBool && field === undefined) ? "This field must not be empty." : true),
        //     description: 'dropdown list'
        // },
        // {
        //     title: 'Default Parent Variant Value',
        //     name: 'defaultParentValue',
        //     description: 'variant value of current product',
        //     hidden: ({document}) => !document?.variantBool,
        //     validation: Rule => Rule.custom((field, context) => (context.document.variantBool && field === undefined) ? "This field must not be empty." : true),
        //     type: 'string'
        // },
        // {
        //     title: 'Add up to two more custom variants as Child Variants',
        //     name: 'childObj',
        //     type: 'object',
        //     hidden: ({document}) => !document?.variantBool,
        //     description: 'when the user adjusts the parent variant, a new list of child variants (if any) will be generated',
        //     options: {
        //         collapsible: true,
        //         collapsed: true
        //     },
        //     fields: [
        //         {
        //             title: 'Child Variant Title - A',
        //             name: 'childTitleA',
        //             type: 'string',
        //             description: 'dropdown'
        //         },
        //         {
        //             title: 'Child Variant Title - B',
        //             name: 'childTitleB',
        //             type: 'string',
        //             description: 'dropdown'
        //         },
        //         {
        //             title: 'Default Available Child Variants',
        //             name: 'defaultChildArray',
        //             description: 'list default child variants that will be applied to the current product',
        //             type: 'array',
        //             of: [{  
        //                 type: 'object',
        //                 fields: [
        //                     {
        //                         name: 'childA',
        //                         title: 'Child Variant Value A',
        //                         description: 'Will appear under Child Variant Title - A',
        //                         type: 'string'
        //                     },
        //                     {
        //                         name: 'childB',
        //                         title: 'Child Variant Value B',
        //                         description: 'Will appear under Child Variant Title - B',
        //                         type: 'string'
        //                     },
        //                     {
        //                         name: 'price',
        //                         title: 'Price (if different)',
        //                         type: 'number'
        //                     },
        //                     {
        //                         name: 'inventory',
        //                         title: 'Inventory',
        //                         type: 'number'
        //                     }
        //                 ]
        //             }] 
        //         }

        //    ]
        // },
        // {
        //     title: 'Variant Values',
        //     name: 'variants',
        //     type: 'array',
        //     hidden: ({document}) => !document?.variantBool,
        //     validation: Rule => Rule.custom((field, context) => (context.document.variantBool && field === undefined) ? "This field must not be empty." : true),
        //     of: [
        //         {
        //         title: 'Variant',
        //         type: 'productVariant',
        //         },
        //     ],
        // },
        
        // {
        //     title: 'Dimension Variant Values',
        //     name: 'dimensionVariants',
        //     type: 'array',
        //     hidden: ({document}) => !document?.boolObj?.dimensionBool,
        //     of: [
        //         {
        //         title: 'Variant',
        //         type: 'dimensionVariant',
        //         },
        //     ],  
        // },
            
        
        
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
            //validation: Rule => Rule.unique().custom((obj) => obj.newValue),
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