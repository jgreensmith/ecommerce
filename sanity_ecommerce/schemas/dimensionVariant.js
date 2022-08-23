export default {
    title: 'Dimension variant',
    name: 'dimensionVariant',
    type: 'object',
    fields: [
        
        {
            title: 'Inventory',
            name: 'dimensionInventory',
            type: 'number',
            description: 'How much of this product variant do you have in stock?'
        },
        
        {
            title: 'Price',
            name: 'dimensionPrice',
            type: 'number',
        },
       
        {
            name: 'dimensionSize',
            title: 'Dimension - Size / weight / length',
            description: 'Will appear under First Dimension title',
            type: 'string'
        },
        {
            title: 'Default Available Second Dimensions',
            name: 'secondDimensions',
            type: 'array',
            of: [{  
                type: 'object',
                fields: [
                    
                    {
                        name: 'secondDimension',
                        title: 'Second Dimension - Size / weight / length (leave blank if n/a)',
                        description: 'Will appear under Second Dimension title',
                        type: 'string'
                    },
                    {
                        name: 'sizePrice',
                        title: 'Price (if different)',
                        type: 'number'
                    },
                    {
                        name: 'sizeInventory',
                        title: 'Inventory',
                        type: 'number'
                    }
                ]
            }]
            
        },
        
        
    ],
    }
  