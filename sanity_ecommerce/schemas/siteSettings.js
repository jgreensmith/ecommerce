export default {
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    groups: [
       
        {
          name: 'colors',
          title: 'Custom Color Themes',
        },
        {
            name: 'contact',
            title: 'Contact/ Socials'
        },
        {
            name: 'about',
            title: 'Profile Page'
        }
      ],
    fields: [
        {
            name: 'title',
            title: 'Company Name',
            type: 'string',
            validation: Rule => Rule.required()        
        },
        {
            name: 'contactObj',
            title: 'Contact and Social media Settings',
            type: 'object',
            group: 'contact',
            fields: [
                {
                    name: 'email',
                    title: 'Company Email',
                    type: 'string',
                    description: 'The Email for customers to contact you',     
                    validation: Rule => Rule.required()   
                },
                {
                    name: 'subject',
                    title: 'Default Subject',
                    type: 'string',
                    description: 'This will set the subject for the customer to email you. example: Product Enquiry', 
                    hidden: ({parent}) => !parent?.email
                },
                {
                    name: 'instaBool',
                    title: 'Add Instagram',
                    type: 'boolean'
                },
                {
                    name: 'instagram',
                    title: 'Instagram URL',
                    description: 'must be a URL, not your username! copy the URL from your profile page',
                    type: 'string',
                    hidden: ({parent}) => !parent?.instaBool

                },
                {
                    name: 'faceBool',
                    title: 'Add Facebook',
                    type: 'boolean'
                },
                {
                    name: 'facebook',
                    title: 'Facebook URL',
                    description: 'must be a URL, not your username! copy the URL from your profile page',
                    type: 'string',
                    hidden: ({parent}) => !parent?.faceBool
                },
                {
                    name: 'twitBool',
                    title: 'Add Twitter',
                    type: 'boolean'
                },
                {
                    name: 'twitter',
                    title: 'Twitter URL',
                    description: 'must be a URL, not your username! copy the URL from your profile page',
                    type: 'string',
                    hidden: ({parent}) => !parent?.twitBool
                },
                {
                    name: 'tikBool',
                    title: 'Add TikTok',
                    type: 'boolean'
                },
                {
                    name: 'tiktok',
                    title: 'TikTok URL',
                    description: 'must be a URL, not your username! copy the URL from your profile page',
                    type: 'string',
                    hidden: ({parent}) => !parent?.tikBool
                },
                {
                    name: 'customLinks',
                    title: 'Add Custom Links',
                    type: 'array',
                    of: [{
                        name: 'customLink',
                        title: 'Custom Link',
                        type: 'object',
                        fields: [
                            {
                                name: 'linkTitle',
                                title: 'Link Title',
                                type: 'string',
                                description: 'Will appear on link button'
                            },
                            {
                                name: 'linkUrl',
                                title: 'Link URL',
                                type: 'string',
                                description: 'must be a URL, not your username! copy the URL from your profile page'
                            }
                        ]

                    }]
                }
            ]
        },
        
        {
            name: 'profileImage',
            title: 'Profile Image',
            type: 'image',
            group: 'about',
            options: {
                hotspot: true
            },
            description: 'This image will appear in the about page'
        },
        {
            name: 'about',
            title: 'Main Description',
            type: 'blockContent',
            group: 'about',
            description: 'main description of company for about page'
        },
        {
            name: 'extraInfo',
            title: 'Extra Infomation',
            type: 'array',
            group: 'about',
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