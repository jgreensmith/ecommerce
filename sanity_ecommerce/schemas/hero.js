
export default {
    name: 'hero',
    title: 'Hero',
    type: 'document',
    fields: [
        {
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image',
            options: {
                hotspot: true
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'alt',
            title: 'Alt tag',
            type: 'string',
            description: 'brief description of the image, important for SEO',
            validation: Rule => Rule.required()
        },
        
    ]
}