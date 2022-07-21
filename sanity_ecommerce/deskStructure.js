import S from '@sanity/desk-tool/structure-builder';
import { FiSettings } from "react-icons/fi";

export default () =>
  S.list()
    .title('Content')
    .items(
    [    
        
        S.listItem()
        .title('Site Settings')
        .icon(FiSettings)
        .child(
            S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            ),
            S.divider(),

        // Add a new list item for category
        ...S.documentTypeListItems().filter(item => !['siteSettings', 'category'].includes(item.getId())),

        S.listItem()
        .title('Categories')
        .child(
            S.documentTypeList('category')
            .title('Categories')
            .child(catId =>
                // List out project documents where the _id for the selected
              // category appear as a _ref in the project’s categories array
                S.documentList()
                .schemaType('product')
                .title('Product')
                .filter(
                    '_type == "product" && $catId in categories[]._ref'
                )
                .params({ catId })
          
            )
        ),

    ]    
)