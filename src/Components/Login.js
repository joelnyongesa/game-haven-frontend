import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { TailSpin} from 'react-loader-spinner'
import { useState } from 'react';
function Login({ setUser }) {
  YupPassword(Yup);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function handleSignUpClick() {
    navigate('/signup');
  }

  const errorMessagesSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email cannot be blank'),
    password: Yup.string().password().min(8).required('Password cannot be blank'),
  });

  return (
    <>
      {
        loading && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(255,255,255, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 999,
            }}
          >
            <TailSpin 
                  height={100}
                  width={100}
                  radius={5}
                  color="#000000"
                  ariaLabel='tail-spin-loading'
                  visible
                />
          </div>
        )
      }
      <div className='flex flex-col items-center justify-center p-20'>
        <h1 className='font-bold text-2xl mb-8'> Log In</h1>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={errorMessagesSchema}
          onSubmit={(values, formikBag) => {
            // formikBag.setSubmitting(true);
            setLoading(true)
            fetch('https://game-haven-backend.onrender.com/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify(values),
            })
              .then((res) => {
                if (res.ok) {
                  enqueueSnackbar('Logged in successfully', { variant: 'success' });
                  return res.json();
                } else if (res.status === 401) {
                  enqueueSnackbar('Invalid email or password', { variant: 'error' });
                  return null;
                }
              })
              .then((data) => {
                if (data) {
                  setUser(data);
                  console.log(data);
                  navigate('/all-games');
                }
              })
              .catch((e) => console.log(e))
              .finally(() => {
                // formikBag.setSubmitting(false); // Set submitting to false after processing
                setLoading(false)
                formikBag.resetForm();
              });
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className='flex flex-col content-center justify-center max-w-xs w-full'>
              <label className='m-2 font-bold' htmlFor='email'>
                Email address
              </label>
              <Field type='text' name='email' id='email' className='text-rich-black px-2 rounded' />
              {touched.email && errors.email && <div className='text-indian-red'>{errors.email}</div>}

              <label className='m-2 font-bold' htmlFor='password'>
                Password
              </label>
              <Field type='password' name='password' id='password' className='text-rich-black px-2 rounded' />
              {touched.password && errors.password && <div className='text-indian-red'>{errors.password}</div>}

              <Button type='submit' content='Log In' className='text-sm my-5 mx-auto py-2 w-2/6' disabled={isSubmitting} />
            </Form>
          )}
        </Formik>
        <p>
          Don't have an account? <span className='font-bold' onClick={handleSignUpClick}>
            Sign Up
          </span>
        </p>
      </div>
    </>
  );
}

export default Login;
