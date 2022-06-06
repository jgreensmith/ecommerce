export default {
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Site Title',
            type: 'string'
        },
        {
            name: 'profileImage',
            title: 'Profile Image',
            type: 'image',
            options: {
                hotspot: true
            }
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
            name: 'seoDescription',
            title: 'Meta Description',
            type: 'text',
            description: 'brief description of page for Search Engine Optimization'

        },
    ]
}