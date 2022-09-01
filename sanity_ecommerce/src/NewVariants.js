import React from 'react'
import { FormBuilderInput } from '@sanity/form-builder/lib/FormBuilderInput'
import Fieldset from 'part:@sanity/components/fieldsets/default'
// Utilities for patching
import { setIfMissing } from '@sanity/form-builder/PatchEvent'


export const MyCustomObject = React.forwardRef((props, ref) => {
    // destructure props for easier use
    const {
      compareValue,
      focusPath,
      markers,
      onBlur,
      onChange,
      onFocus,
      presence,
      type,
      value,
      level
    } = props

    const handleFieldChange = React.useCallback(
      (field, fieldPatchEvent) => {
        // fieldPatchEvent is an array of patches
        // Patches look like this:
        /*
            {
                type: "set|unset|setIfMissing",
                path: ["fieldName"], // An array of fields
                value: "Some value" // a value to change to
            }
        */
        onChange(fieldPatchEvent.prefixAll(field.name).prepend(setIfMissing({ _type: type.name })))
      },
      [onChange]
    )

    // Get an array of field names for use in a few instances in the code
    const fieldNames = type.fields.map((f) => f.name)

    // If Presence exist, get the presence as an array for the children of this field
    const childPresence =
      presence.length === 0
        ? presence
        : presence.filter((item) => fieldNames.includes(item.path[0]))

    // If Markers exist, get the markers as an array for the children of this field
    const childMarkers =
      markers.length === 0 
        ? markers 
        : markers.filter((item) => fieldNames.includes(item.path[0]))

    return (
      <Fieldset
        legend={type.title} // schema title
        description={type.description} // schema description
        markers={childMarkers} // markers built above
        presence={childPresence} // presence built above
      >
        {type.fields.map((field, i) => {
          return (
            // Delegate to the generic FormBuilderInput. It will resolve and insert the actual input component
            // for the given field type
            <FormBuilderInput
              level={level + 1}
              ref={i === 0 ? ref : null}
              key={field.name}
              type={field.type}
              value={value && value[field.name]}
              onChange={(patchEvent) => handleFieldChange(field, patchEvent)}
              path={[field.name]}
              markers={markers}
              focusPath={focusPath}
              readOnly={field.type.readOnly}
              presence={presence}
              onFocus={onFocus}
              onBlur={onBlur}
              compareValue={compareValue}
            />
          )
        })}
      </Fieldset>
    )
  }
)