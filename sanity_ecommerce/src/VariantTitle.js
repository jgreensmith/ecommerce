import React, { useEffect, useState } from 'react';
import { FormField } from '@sanity/base/components'
import PatchEvent, {set, unset} from '@sanity/form-builder/PatchEvent'
import { withDocument } from 'part:@sanity/form-builder'
import { Box, Card, Grid, Select, Stack, TextInput } from '@sanity/ui'
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
        document,
        parent
      } = props

    const inputId = useId();
    let newValue = 'Select a Variant Combination'
    

    const variantKey = document.variantComboList.find(x => x._key === parent._key)
    const selectedCombo = variantKey.varSelect

  

    
    useEffect(() => {
        if(!selectedCombo) {
            newValue = 'Select a Variant Combination'
            onChange(PatchEvent.from(unset()))

        } else {
            const parsed = JSON.parse(selectedCombo)
    
            newValue = `${parsed.priVar}, ${parsed.secVar}, ${parsed.tertVar}`
            //setNewValue(`${parsed.priVar}, ${parsed.secVar}, ${parsed.tertVar}`)    
            
            
        }
        //handleChange(newValue)
        onChange(PatchEvent.from(set(newValue)))

    }, [selectedCombo])
    
    

   
   
      
      console.log(props)
return (
  <FormField
    description={type.description}  // Creates description from schema
    __unstable_markers={markers}    // Handles all markers including validation
    __unstable_presence={presence}  // Handles presence avatars
    inputId={inputId}
  >
    
            <input
                style={{margin: 0, padding: 0}}
                type='hidden'
                value={newValue}                 // Current field value
                readOnly={readOnly}           // If "readOnly" is defined make this field read only
                placeholder={placeholder}     // If placeholder is defined, display placeholder text
                onFocus={onFocus}  
                onBlur={onBlur}               // Handles blur events
                ref={ref}
                id={inputId}
            />
            
    
    

  </FormField>
)
}
)
export default withDocument(Variants);