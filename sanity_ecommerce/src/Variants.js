import React, { useState } from 'react';
import { FormField } from '@sanity/base/components'
import PatchEvent, {set, unset} from '@sanity/form-builder/PatchEvent'
import { withDocument } from 'part:@sanity/form-builder'
import { Box, Card, Grid, Select, Stack } from '@sanity/ui'
import { Color, Button, ListButton } from './components'
import { paletteList } from './paletteList'


import { useId } from "@reach/auto-id" // hook to generate unique IDs


export const Variants = React.forwardRef((props, ref) => {
  
    const { 
        type,         // Schema information
        value,        // Current field value
        readOnly,     // Boolean if field is not editable
        placeholder,  // Placeholder text from the schema
        markers,      // Markers including validation rules
        presence,     // Presence information for collaborative avatars
        onFocus, 
        onBlur, 
        onChange,
        document
      } = props

    const inputId = useId();
    //const [addVariant, setAddVariant] = useState({price: 0, quantity: 0})

    const primaryVariants = document?.primaryVar ? document.primaryVar : []
    const secondaryVariants = document?.secondaryVar ? document.secondaryVar : []
    const tertiaryVariants = document?.tertiaryVar ? document.tertiaryVar : []

    const newArray = primaryVariants.flatMap((x) => {
        return secondaryVariants.flatMap((y) => {
            return tertiaryVariants.map((z) => {
                return {
                    priVar: x,
                    secVar: y,
                    tertVar: z
                }
            })
        })
    })

    
    
        
    

    const handleChange = React.useCallback(
        // useCallback will help with performance
        (event) => {
          const inputValue = event.currentTarget.value // get current value
          // if the value exists, set the data, if not, unset the data
          onChange(PatchEvent.from(inputValue ? set(inputValue) : unset()))
        },
        [onChange]
      )
      //console.log(props)
      //console.log(newArray)
return (
  <FormField
    description={type.description}  // Creates description from schema
    title={type.title}              // Creates label from schema title
    __unstable_markers={markers}    // Handles all markers including validation
    __unstable_presence={presence}  // Handles presence avatars
    inputId={inputId}
  >
    
        {/* <Card padding={4} > */}
            <Select
                ref={ref}
                readOnly={readOnly}
                value={value}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}
                id={inputId}
            >
                <option value="" disabled selected hidden>Select Variant Combination</option>

                {newArray.map((x, i) => (
                    <option 
                        key={i}
                        value={JSON.stringify(x)}
                    >
                        {`${x.priVar}, ${x.secVar}, ${x.tertVar}`} 
                    </option>
                ))}
            
            </Select>

        {/* </Card> */}
    
    

  </FormField>
)
}
)
export default withDocument(Variants);