'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { JsonForms } from '@jsonforms/react'
import { ValidationMode } from '@jsonforms/core'
import { materialCells, materialRenderers } from '@jsonforms/material-renderers'
import { Button } from '@mui/material'
import Ajv from 'ajv'
import styles from './LeadForm.module.css'

import {
  personalSchema,
  personalUiSchema,
  visaSchema,
  visaUiSchema,
  helpSchema,
  helpUiSchema
} from './formSchema'

const combinedSchema = {
  type: 'object',
  properties: {
    personal: personalSchema,
    visa: visaSchema,
    help: helpSchema
  },
  required: ['personal', 'visa', 'help']
}

const LeadForm: React.FC = () => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [validationMode, setValidationMode] = useState<ValidationMode | undefined>('ValidateAndHide')
  const [finished, setFinished] = useState(false)
  
  const ajv = new Ajv({
    strict: false, // Disables strict mode
    allErrors: true, // Collects all errors
    verbose: true // Provides detailed error messages
  });

  const validate = ajv.compile(personalSchema)

  const handleSubmit = (event: React.FormEvent) => {
    console.log('Submitting form')

    event.preventDefault()

    setLoading(true)

    setValidationMode('ValidateAndShow')

    const isValid = validate(data)

    if (isValid) {
      console.log('Validation passed')

      // submit to API
      // TODO

      // direct to confirmation screen
      setFinished(true)
    }
    else {
      console.log('Validation failed')
      
      setValidationMode('ValidateAndShow')
    }


    setLoading(false)

    // direct to confirmation screen if validation passes
  }

  if (finished) {
    return (
      <div>
        Thank you for submitting your information
      </div>
    )  
  }

  return (
    <div>
      <div className={styles.heroSection}>
        <div className={styles.heroText}>
          <Image
            src="/alma-logo.png"
            alt="Hero Image"
            width={68}
            height={24}
            objectFit="cover"
            objectPosition="center"
            className={styles.logo}
          />
          <h1 className={styles.heading}>
            Get An Assessment<br/>
            Of Your Immigration Case
          </h1>
        </div>
      </div>

      <div className={styles.form}>
        <JsonForms
          schema={personalSchema}
          uischema={personalUiSchema}
          data={data}
          renderers={materialRenderers}
          cells={materialCells}
          onChange={({ data }) => setData(data)}
          validationMode={validationMode}
        />

        <div className={styles.submitContainer}>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LeadForm
