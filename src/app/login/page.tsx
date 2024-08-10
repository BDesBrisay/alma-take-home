import styles from "./login.module.css"

import Header from "@/components/Header"

// import { mockLogin } from '@/mockapi'
import { JsonForms } from "@jsonforms/react";
import { useState } from "react";

// jsonforms schema
const loginSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
      title: 'Email'
    },
    password: {
      type: 'string',
      format: 'password',
      title: 'Password'
    }
  },
  required: ['email', 'password']
};

const loginUiSchema = {
  email: {
    'ui:widget': 'email',
    'ui:placeholder': 'Enter your email'
  },
  password: {
    'ui:widget': 'password',
    'ui:placeholder': 'Enter your password'
  }
};

export default function Login() {
  const [data, setData] = useState({});

  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.grid}>
        <h1>Login</h1>
        
        <div>
          <JsonForms
            schema={loginSchema}
            uischema={loginUiSchema}
            data={data}
            renderers={materialRenderers}
            cells={materialCells}
            onChange={({ data }) => setData((prevData) => ({ ...prevData, ...data }))} // merge data
            validationMode={validationMode}
          />
        </div>
      </div>
    </main>
  );
}