// ./src/schema/category.js
import { BiCategoryAlt } from "react-icons/bi";


export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: BiCategoryAlt,
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