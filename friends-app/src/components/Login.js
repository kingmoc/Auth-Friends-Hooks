import React, { useState } from 'react';
import { Formik } from 'formik';
import { Button, Form, Grid, Icon, Header, Message, Image, Segment, } from 'semantic-ui-react'
import * as Yup from "yup";
import axios from 'axios'
import { Redirect } from "react-router-dom";

import media from '../media/friends.png'


const Login = (props) => {
    console.log(props)

    const[loginErrorMessage, setLoginErrorMessage] = useState('')
    const[error, setError] = useState(false)

    return (

        <Formik 
        
            initialValues = {{
                username: "",
                password: "",
            }}
            onSubmit={(values, actions,) => {
                // actions.resetForm()
                const url = "http://localhost:5000/api/login";

                actions.setSubmitting(true)

                axios.post(url, values)
                    .then(res => {
                        console.log(res)
                        let userId = res.data.payload.slice(0, 5)
                        console.log(props.history.push)

                        localStorage.setItem('token', res.data.payload)
                        actions.setSubmitting(false)
                        props.history.push(`/dashboard/${userId}`)
                    })
                    .catch(err => {
                        console.log(err.response.data)
                        setError(true)
                        setLoginErrorMessage(err.response.data.error)
                        actions.setSubmitting(false)
                    })
            }}

            validationSchema={UserSignUpSchema}
        
            render = {({ values, handleSubmit, handleChange, errors, touched, isSubmitting, ...props }) => (
                <Grid style={{ height: '100vh' }} verticalAlign='middle' textAlign='center' divided stackable>

                     <Grid.Column width={6}>

                        <Header as='h1' color='orange' textAlign='center'>
                            Sign In to see Your List of Friends!
                        </Header>

                        <Image src={media} alt='friends' size='medium' circular centered/>

                    </Grid.Column>
                    
                    <Grid.Column width={6}>
                        
                        <Segment>
                            <Form onSubmit={handleSubmit} size='big'>

                                <Form.Input   
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    icon='user circle' 
                                    iconPosition='left'
                                    value={values.username}
                                    onChange={handleChange}
                                    error={touched.username && errors.username}
                                />

                                <Form.Input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    icon='lock' 
                                    iconPosition='left'
                                    value={values.password}
                                    onChange={handleChange}
                                    error={touched.password && errors.password}
                                />

                                <Button 
                                    color='brown' 
                                    animated
                                    type='submit' 
                                    fluid
                                    loading={isSubmitting}
                                    size='big'
                                >
                                    <Button.Content visible>Submit</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='arrow right' />
                                    </Button.Content>                                
                                </Button>

                                {error && <Header color='red' size='small'>{loginErrorMessage.slice(0,32)}</Header>}

                            </Form>
                            <Message floating>
                            <Icon name='help' />
                                Don't Have an Account?&nbsp;<a href='#'>Signup here</a>&nbsp;and get started!
                            </Message>
                        </Segment>

                    </Grid.Column>
                </Grid>
            )}        
        
        />
    )
}

const UserSignUpSchema = Yup.object().shape({

    username: Yup.string()
        .min(3, 'Not Long Enough')
        .max(15, 'Slow Down Partner')
        .notOneOf(['waffle@syrup.com'], "That email is already taken.")
        .required('You must participate if you want the goods'),
    password: Yup.string()
        .min(3, 'Not Long Enough')
        .max(15, 'Slow Down Partner')
        .required('You must participate if you want the goods')
})

export default Login;    