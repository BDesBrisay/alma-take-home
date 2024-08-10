/**
 * This file contains the JsonForm schemas for 3 sections:
 * 1. Personal Information
 * 2. Visa Information
 * 3. How can we help you?
 */

export const personalSchema = {
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
      minLength: 2,
      description: 'First Name',
    },
    lastName: {
      type: 'string',
      minLength: 2,
      description: 'Last Name',
    },
    email: {
      type: 'string',
      format: 'email',
      description: 'Email Address',
    },
    phone: {
      type: 'string',
      pattern: '^\\+?[1-9]\\d{1,14}$',
      description: 'Phone Number',
    },
    linkedin: {
      type: 'string',
      format: 'uri',
      description: 'Linkedin / Personal Website',
    },
    resume: {
      type: 'string',
      format: 'data-url',
      description: 'Upload your resume',
    }
  },
  required: ['firstName', 'lastName', 'email', 'phone', 'linkedin', 'resume'],
}

export const personalUiSchema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/firstName',
    },
    {
      type: 'Control',
      scope: '#/properties/lastName',
    },
    {
      type: 'Control',
      scope: '#/properties/email',
    },
    {
      type: 'Control',
      scope: '#/properties/phone',
    },
    {
      type: 'Control',
      scope: '#/properties/linkedin',
      label: 'Linkedin / Personal Website'
    },
    {
      type: 'Control',
      scope: '#/properties/resume',
      label: 'Upload your resume'
    }
  ],
}

export const visaSchema = {
  title: 'Visa Information',
  description: 'Please provide your visa information',
  type: 'object',
  required: ['visa'],
  properties: {
    visa: {
      type: 'string',
      title: 'Visa', // O-1, EB-1A, EB-2 NIW, I Don't Know 
      oneOf: [
        { const: 'O-1', title: 'O-1' },
        { const: 'EB-1A', title: 'EB-1A' },
        { const: 'EB-2 NIW', title: 'EB-2 NIW' },
        { const: 'I Don\'t Know', title: 'I Don\'t Know' }
      ]
    },
  },
}

export const visaUiSchema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/visa',
    },
  ],
}

export const helpSchema = {
  title: 'How can we help you?',
  description: 'Please provide us with more information',
  type: 'object',
  required: ['message'],
  properties: {
    message: {
      type: 'string',
      title: 'Message',
    },
  },
}

export const helpUiSchema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/message',
    },
  ],
}