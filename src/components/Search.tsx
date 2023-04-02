import React from 'react'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox'
import '@reach/combobox/styles.css'
import { placeTypeRestrictions } from '../config/placesAutocomplete'

export default function Search({ panTo }: { panTo: any }) {
  const componentRestrictions = {
    administrativeArea: 'administrative_area_level_2`',
  }
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: placeTypeRestrictions
    },
  })

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const handleInput = (e) => {
    setValue(e.target.value)
  }

  const handleSelect = async (address: any) => {
    setValue(address, false)
    clearSuggestions()

    try {
      const results = await getGeocode({ address })
      const { lat, lng } = await getLatLng(results[0])
      panTo({ lat, lng })
    } catch (error) {
      console.log('😱 Error: ', error)
    }
  }

  return (
    <div className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          style={{ color: 'black' }}
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search a place"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === 'OK' &&
              data.map(({ id, description }) => (
                <ComboboxOption style={{ color: 'black' }} key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  )
}
