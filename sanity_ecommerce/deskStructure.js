import S from '@sanity/desk-tool/structure-builder';
import { FiSettings } from "react-icons/fi";
import Iframe from 'sanity-plugin-iframe-pane'

import resolveProductionUrl from './resolveProductionUrl'

export const getDefaultDocumentNode = () => {
  return S.document().views([
    S.view.form(),
    S.view
      .component(Iframe)
      .options({
        url: (doc) => resolveProductionUrl(doc),
      })
      .title('Preview'),
  ])
}


export default () =>
  S.list()
    .title('Content')
    .items(
    [    
        
        S.listItem()
        .title('Site Settings')
        .icon(FiSettings)
        .child(
            getDefaultDocumentNode()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            ),

        S.divider(),

        // Add a new list item for category
        
        
        S.listItem()
        .title('Products by Category')
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
                    
        ...S.documentTypeListItems().filter(item => !['siteSettings'].includes(item.getId())),
    ]    
)