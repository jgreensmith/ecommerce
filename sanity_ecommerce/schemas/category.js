// ./src/schema/category.js


export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
        name: 'title', 
        title: 'Category Title',
        type: 'string',
    },
    
   
  ],
//   // Customise the preview so parents are visualised in the studio
//   preview: {
//     select: {
//       title: 'title',
//       subtitle: 'parent.title',
//     },
//     prepare: ({title, subtitle}) => ({
//       title,
//       subtitle: subtitle ? `- ${subtitle}` : ``,
//     }),
//   },
}