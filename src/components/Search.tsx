import React, { ReactEventHandler, useState } from 'react'
import usePlacesAutocomplete, { getGeocode, getLatLng, getDetails } from 'use-places-autocomplete'
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox'
import '@reach/combobox/styles.css'
import { placeTypeRestrictions, searchTypesFilter } from '../config/placesAutocomplete'

export default function Search({ panTo }: { panTo: any }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    // requestOptions: {
    //   types: placeTypeRestrictions
    // },
    debounce: 1000,
    cache: 86400,
  })

  const [placeId, setPlaceId] = useState<string>()

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const handleSelect = async (description: any, placeId: string) => {
    setValue(description, false)
    clearSuggestions()

    try {
      const results = await getGeocode({ address: description })
      // const location = await getLocation()
      // const place = await getDetails({fields: ["place_id", "name", "formatted_address"], })
      const { lat, lng } = await getLatLng(results[0])
      panTo({ lat, lng, placeId, description })
      setValue('')
    } catch (error) {
      console.log('😱 Error: ', error)
    }
  }

  return (
    <div className="search">
      <Combobox>
        <ComboboxInput
          style={{ color: 'black' }}
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
          disabled={!ready}
          placeholder="Search a place"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === 'OK' &&
              data.map(
                ({
                  place_id,
                  description,
                  structured_formatting: { main_text, secondary_text },
                }) => (
                  <ComboboxOption
                    style={{ color: 'black' }}
                    key={place_id}
                    value={`${description} `}
                    onClick={() => {
                      setPlaceId(place_id)
                      handleSelect(description, place_id)
                    }}
                  />
                )
              )}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  )
}
