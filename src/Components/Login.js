import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup'
import YupPassword from 'yup-password'
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

function Login({ updateUser}) {

  const {enqueueSnackbar} = useSnackbar();
  const navigate = useNavigate();

  function handleSignUpClick(){
    navigate('/signup')
  }

  YupPassword(Yup)
    const errorMessagesSchema = Yup.object().shape({
        
        email: Yup.string()
            .email('Invalid email')
            .required('This field is required'),
        password: Yup.string()
            .password()
            .min(8),
    });
  return (
    <>
            <div className='flex flex-col items-center justify-center p-20'>
                <h1 className='font-bold text-2xl mb-8'> Log In</h1>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}  
                    validationSchema={errorMessagesSchema}  
                    onSubmit={(values, e)=>{
                        fetch('/login',{
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(values)
                        }).then((res)=>{
                          res.json()
                          if (res.status === 200){
                            // console.log("Logged In successfully")
                            enqueueSnackbar("Log in successful!", {variant: "success"})
                            navigate('/all-games')
                            // Navigate
                          }
                          else{
                            // console.log("Invalid credentials");
                            enqueueSnackbar("Invalid username or password", {variant: "error"})
                          }
                        }
                        )
                        .then(data=>console.log(data))
                        .catch(e=>console.log(e))
                        e.resetForm()
                    }}
                >
                    {({errors, touched})=>(
                        <Form className='flex flex-col content-center justify-center max-w-xs w-full'>
                            <label className='m-2 font-bold' htmlFor='email'>
                                Email address
                            </label>
                            <Field type='text' name="email" id='email' className='text-rich-black px-2 rounded'/>
                            {touched.email && errors.email && <div className='text-indian-red'>{errors.email}</div>}

                            <label className='m-2 font-bold' htmlFor='password'>
                                Password
                            </label>
                            <Field type='password' name='password' id='password' className='text-rich-black px-2 rounded' />
                            {touched.password && errors.password && <div className='text-indian-red'>{errors.password}</div>}

                            <Button type='submit' content='Log In' className='text-sm my-5 mx-auto py-2  w-2/6'/>
                        </Form>
                    )}

                </Formik>
                <p>Don't have an account? <span className='font-bold' onClick={handleSignUpClick}>Sign Up</span></p>
            </div>
    </>
  )
}

export default Login