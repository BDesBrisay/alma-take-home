import React, { useState } from 'react'
import { withJsonFormsControlProps } from '@jsonforms/react'
import { ControlProps, getErrorAt, rankWith, scopeEndsWith } from '@jsonforms/core'
import { TextField, Button } from '@mui/material'

import { JsonFormsState } from '@jsonforms/core';

const FileUpload = ({ data, handleChange, path }: ControlProps) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (upload) => {
        const result = upload.target?.result;
        if (typeof result === 'string') {
          handleChange(path, result);
          setFileName(file.name);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <React.Fragment>
      <TextField
        label="Upload Resume"
        value={fileName || ''}
        fullWidth
        margin="normal"
        InputProps={{
          readOnly: true,
        }}
      />
      <input
        accept=".pdf,.doc,.docx"
        style={{ display: 'none' }}
        id="upload-resume"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="upload-resume">
        <Button variant="contained" color="primary" component="span">
          Choose File
        </Button>
      </label>
    </React.Fragment>
  );
};

export const fileUploadControlTester = rankWith(
  3, // increase the rank as needed
  scopeEndsWith('resume')
);

export default withJsonFormsControlProps(FileUpload);
