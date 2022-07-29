export default {
    name: 'siteSettings',
    type: 'document',
    groups: [
       
        {
          name: 'colors',
          title: 'Custom Colour Themes',
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
                    title: 'Default Email Subject',
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
                    type: 'url',
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
                    type: 'url',
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
                    type: 'url',
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
                    type: 'url',
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
                                type: 'url',
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
            title: 'Custom Colour Themes',
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
                    title: 'Primary Colour',
                    description: 'Main colour, background colour of navbar',
                    type: 'string',
                    validation: Rule => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, { name: "hex code format", invert: false })
                    
                },
                
                {
                    name: 'secondary',
                    title: 'Secondary Colour',
                    description: 'This will appear on main buttons',
                    type: 'string',
                    validation: Rule => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, { name: "hex code format", invert: false })
                    
                },
                {
                    name: 'background',
                    title: 'Background',
                    type: 'string',
                    validation: Rule => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, { name: "hex code format", invert: false })
                    
                },
                
                {
                    name: 'textBackground',
                    title: 'Custom Font Colour',
                    type: 'object',
                    options: {
                        collapsible: true,
                        collapsed: true
                    },
                    fields: [
                        {
                            name: 'dark',   
                            title: 'Dark Text',
                            type: 'string',
                            description: 'Default is black',
                            validation: Rule => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, { name: "hex code format", invert: false })
                        },
                        {
                            name: 'light',   
                            title: 'Light Text',
                            type: 'string',
                            description: 'Default is white',
                            validation: Rule => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, { name: "hex code format", invert: false })   
                        }
                    ]
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