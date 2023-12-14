import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup'
import YupPassword from 'yup-password'
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSnackbar } from 'notistack';




function SignUp() {
    const [refreshPage, setRefreshPage] = useState(false)
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();

    function handleLogInClick(){
        navigate('/login')
    }



    YupPassword(Yup)
    const errorMessagesSchema = Yup.object().shape({
        username: Yup.string()
            .min(2, "Username too short!")
            .max(50, "Username too long")
            .required('This field is required'),
        email: Yup.string()
            .email('Invalid email')
            .required('This field is required'),
        password: Yup.string()
            .password()
            .min(8),
        confirmPassword: Yup.string()
            .required('Please retype your password')
            .oneOf([Yup.ref('password')], "Passwords do not match!")
    });

    
  return (
    <>
            <div className='flex flex-col items-center justify-center p-20'>
                <h1 className='font-bold text-2xl mb-8'> Sign Up</h1>
                <Formik
                    initialValues={{
                        username: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    }}  
                    validationSchema={errorMessagesSchema}  
                    onSubmit={({confirmPassword, e, ...values})=>{
                        fetch("/signup",{
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(values, null, 2),
                        }).then((res)=>{
                            console.log(res.status);
                            if (res.status === 201){
                                navigate('/login');
                                setRefreshPage(!refreshPage);
                                enqueueSnackbar("Account created successfully", {variant: "success"})
                            }                           
                        })
                        e.resetForm();
                    }}
                >
                    {({errors, touched})=>(
                        <Form className='flex flex-col content-center justify-center max-w-xs w-full'>
                            <label className='m-2 font-bold' htmlFor='username'>
                                Username
                            </label>
                            <Field type='text' name="username" id='username' className='text-rich-black px-2 rounded'/>
                            {touched.username && errors.username && <div className='text-indian-red'>{errors.username}</div>}

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

                            <label className='m-2 font-bold' htmlFor='password'>
                                Confirm Password
                            </label>
                            <Field type='password' name='confirmPassword' id='confirmPassword' className='text-rich-black px-2 rounded' />
                            {touched.confirmPassword && errors.confirmPassword && <div className='text-indian-red'>{errors.confirmPassword}</div>}

                            <Button type='submit' content='Sign Up' className='text-sm my-5 mx-auto px-1 py-2 w-2/6'/>
                        </Form>
                    )}

                </Formik>
                <p>Already Registered? <span className='font-bold' onClick={handleLogInClick}>Log In Here</span></p>
            </div>
    </>
  )
}

export default SignUp