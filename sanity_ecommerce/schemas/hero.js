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
        }
    ]
}