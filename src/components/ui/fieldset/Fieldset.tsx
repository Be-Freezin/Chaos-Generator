import React, { FC } from 'react'
import './fieldset.css'

export interface FieldsetProps{
  legendTitle: string
  children: React.ReactNode

}

export const Fieldset: FC<FieldsetProps> = ({
legendTitle,
children
}) => {
  return (
    <fieldset className='fieldset'>
      <legend className='legend-title'>{legendTitle}</legend>
      {children}
    </fieldset>
  )
}
