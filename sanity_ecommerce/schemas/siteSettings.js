export default {
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    groups: [
       
        {
          name: 'colors',
          title: 'Custom Color Themes',
        },
      ],
    fields: [
        {
            name: 'title',
            title: 'Company Name',
            type: 'string',
            validation: Rule => Rule.required()        
        },
        {
            name: 'profileImage',
            title: 'Profile Image',
            type: 'image',
            options: {
                hotspot: true
            },
            description: 'This image will appear in the about page'
        },
        {
            name: 'about',
            title: 'Main Description',
            type: 'blockContent',
            description: 'main description of company for about page'
        },
        {
            name: 'extraInfo',
            title: 'Extra Infomation',
            type: 'array',
            description: 'Extra infomation for drop down tabs',
            of: [{
                type: 'text'
            }]
        },
        {
            name: 'colorThemes',
            title: 'Custom Color Themes',
            type: 'object',
            description: 'Must be valid hex codes! make sure there are no spaces',
            group: 'colors',
            options: {
                collapsible: true,
                collapsed: true
            },
            fields: [
                {
                    name: 'primary',
                    title: 'Primary Color',
                    description: 'Main color, background color of navbar',
                    type: 'string',
                    validation: Rule => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, { name: "hex code format", invert: false })
                    
                },
                {
                    name: 'primaryText',
                    title: 'Primary Contrast Text',
                    type: 'object',
                    description: 'Color of navbar text',
                    options: {
                        collapsible: true,
                        collapsed: true
                    },
                    fields: [
                        {
                            name: 'contrastTextLight',
                            title: 'Default Light Text',
                            type: 'boolean',
                            description: 'Use this if primary color is dark',
                            hidden: ({ parent, value }) => !value && parent?.contrastTextDark || parent?.customContrastText
                        },
                        {
                            name: 'contrastTextDark',
                            title: 'Default Dark Text',
                            type: 'boolean',
                            description: 'Use this if primary color is light',
                            hidden: ({ parent, value }) => !value && parent?.contrastTextLight || parent?.customContrastText
                        },
                        {
                            name: 'customContrastText',
                            title: 'Custom Primary Contrast Text',
                            type: 'string',
                            description: 'Must be valid hex code!',
                            validation: Rule => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, { name: "hex code format", invert: false }),
                            hidden: ({ parent, value }) => !value && parent?.contrastTextLight || parent?.contrastTextDark
                        },

                    ]
                },
                {
                    name: 'secondary',
                    title: 'Secondary Color',
                    description: 'This will appear on main buttons',
                    type: 'string',
                    validation: Rule => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, { name: "hex code format", invert: false })
                    
                },
                {
                    name: 'secondaryText',
                    title: 'Secondary Contrast Text',
                    type: 'object',
                    description: 'Color of button text',
                    
                    options: {
                        collapsible: true,
                        collapsed: true
                    },
                    fields: [
                        {
                            name: 'contrastTextLight',
                            title: 'Default Light Text',
                            type: 'boolean',
                            description: 'Use this if secondary color is dark',
                            hidden: ({ parent, value }) => !value && parent?.contrastTextDark || parent?.customContrastText
                        },
                        {
                            name: 'contrastTextDark',
                            title: 'Default Dark Text',
                            type: 'boolean',
                            description: 'Use this if secondary color is light',
                            hidden: ({ parent, value }) => !value && parent?.contrastTextLight || parent?.customContrastText
                        },
                        {
                            name: 'customContrastText',
                            title: 'Custom Contrast Text',
                            type: 'string',
                            description: 'Must be valid hex codes!!',
                            validation: Rule => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, { name: "hex code format", invert: false }),
                            hidden: ({ parent, value }) => !value && parent?.contrastTextLight || parent?.contrastTextDark
                        },

                    ]
                },
                {
                    name: 'background',
                    title: 'Background Color',
                    type: 'string',
                    validation: Rule => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, { name: "hex code format", invert: false })
                },
            ]
        },
        {
            name: 'seoDescription',
            title: 'Home Page Meta Description (SEO)',
            type: 'text',
            description: 'brief description of page for Search Engine Optimization'

        },
    ]
}