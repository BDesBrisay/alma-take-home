'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { JsonForms } from '@jsonforms/react'
import { ValidationMode } from '@jsonforms/core'
import { materialCells, materialRenderers } from '@jsonforms/material-renderers'
import { Button } from '@mui/material'
import Ajv from 'ajv'
import styles from './LeadForm.module.css'
import FileUpload, { fileUploadControlTester } from './FileUpload'

import { mockCreateLead } from '@/mockapi'

import {
  personalSchema,
  personalUiSchema,
  visaSchema,
  visaUiSchema,
  helpSchema,
  helpUiSchema
} from './formSchema'

const combinedJsonFormSchema = {
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
  const [validationMode, setValidationMode] = useState<ValidationMode | undefined>('NoValidation')
  const [finished, setFinished] = useState(false)
  
  const ajv = new Ajv({
    strict: false, // Disables strict mode
    allErrors: true, // Collects all errors
    verbose: true // Provides detailed error messages
  });

  const validate = ajv.compile(combinedJsonFormSchema)

  const handleSubmit = (event: React.FormEvent) => {
    console.log('Submitting form')

    event.preventDefault()

    setLoading(true)

    const isValid = validate(data)

    if (isValid) {
      console.log('Validation passed')

      // submit to API
      mockCreateLead(data)

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
        <h1>Thank you</h1>
        <p>Your information was submitted to our team of immigration<br/>attorneys. Expect an email from hello@tryalma.ai.</p>
        <button onClick={() => {
          setData({})
          setFinished(false)
        }}>
          Go Back to Homepage
        </button>
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

        <Image
          src="/icon-info.png"
          alt="Info"
          width={66}
          height={70}
        />
        <h2>Want to understand you visa options?</h2>
        <p>Submit the form below and our team of experienced attorneys will review your information and send a preliminary assessment if your case based on your goals.</p>

        <JsonForms
          schema={personalSchema}
          uischema={personalUiSchema}
          data={data}
          renderers={[
            ...materialRenderers,
            { tester: fileUploadControlTester, renderer: FileUpload }
          ]}
          cells={materialCells}
          onChange={({ data }) => setData((prevData) => ({ ...prevData, ...data }))} // merge data
          validationMode={validationMode}
        />

        <Image
          src="/icon-dice.png"
          alt="Visa"
          width={66}
          height={70}
        />
        <h2>Visa categories of interest?</h2>

        <JsonForms
          schema={visaSchema}
          uischema={visaUiSchema}
          data={data}
          renderers={materialRenderers}
          cells={materialCells}
          onChange={({ data }) => setData((prevData) => ({ ...prevData, ...data }))} // merge data
          validationMode={validationMode}
        />

        <Image
          src="/icon-heart.png"
          alt="Heart"
          width={76}
          height={70}
        />
        <h2>How Can We Help?</h2>

        <JsonForms
          schema={helpSchema}
          uischema={helpUiSchema}
          data={data}
          renderers={materialRenderers}
          cells={materialCells}
          onChange={({ data }) => setData((prevData) => ({ ...prevData, ...data }))} // merge data
          validationMode={validationMode}
        />

        <div className={styles.submitContainer}>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            size="large"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LeadForm
