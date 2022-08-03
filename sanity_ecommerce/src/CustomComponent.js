import React from 'react';
import { FormField } from '@sanity/base/components'
import PatchEvent, {set, unset} from '@sanity/form-builder/PatchEvent'
import { Box, Card, Grid } from '@sanity/ui'
import { Color, Button } from './components'
import { paletteList } from './paletteList'


import { useId } from "@reach/auto-id" // hook to generate unique IDs


export const CustomComponent = React.forwardRef((props, ref) => {
  
    const { 
        type,         // Schema information
        value,        // Current field value
        readOnly,     // Boolean if field is not editable
        placeholder,  // Placeholder text from the schema
        markers,      // Markers including validation rules
        presence,     // Presence information for collaborative avatars
        onFocus,      // Method to handle focus state
        onBlur,  
        onChange     // Method to handle blur state  
      } = props

    const inputId = useId();


    const handleChange = React.useCallback(
        // useCallback will help with performance
        (event) => {
          const inputValue = event.currentTarget.value // get current value
          // if the value exists, set the data, if not, unset the data
          onChange(PatchEvent.from(inputValue ? set(inputValue) : unset()))
        },
        [onChange]
      )

return (
  <FormField
    description={type.description}  // Creates description from schema
    title={type.title}              // Creates label from schema title
    __unstable_markers={markers}    // Handles all markers including validation
    __unstable_presence={presence}  // Handles presence avatars
    inputId={inputId}
  >
    
        <Grid ref={ref} columns={[2, 3]} gap={2} padding={4} style={{backgroundColor: '#f1f3fa'}}>
          {
            paletteList.map((pal, i) => (
              <Button 
                key={i}
                id={inputId}
                value={JSON.stringify(pal)}                 // Current field value
                onClick={handleChange}
                onFocus={onFocus}  
              >
                
                  <Color style={{borderRadius: '10px 10px 0 0'}} fillColor={pal.primary}  />  
                  <Color fillColor={pal.secondary} />
                  <Color fillColor={pal.background} />
                  <Color fillColor={pal.dark} />
                  <Color style={{borderRadius: '0 0 10px 10px'}}  fillColor={pal.light} />
                

            </Button>
            ))
          }
            
            
        </Grid>
    
    {/* <TextInput
      id={inputId}
      onChange={handleChange}
      value={value || ''}                 // Current field value
      readOnly={readOnly}           // If "readOnly" is defined make this field read only
      placeholder={placeholder}     // If placeholder is defined, display placeholder text
      onFocus={onFocus}             // Handles focus events
      onBlur={onBlur}               // Handles blur events
      ref={ref}
    /> */}

  </FormField>
)
}
)
export default CustomComponent;