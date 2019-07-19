import React from 'react';
import { Formik } from 'formik';
import { Button, Form, Grid, Icon, Header, Message, Image, } from 'semantic-ui-react'
import * as Yup from "yup";
import axios from 'axios'

import media from '../media/friends.png'


const Login = () => {

    return (

        <Formik 
        
            initialValues = {{
                username: "",
                password: "",
            }}
            onSubmit={(values, actions) => {
                actions.resetForm()
                const url = "http://localhost:5000/api/login";

                actions.setSubmitting(true)

                axios.post(url, values)
                    .then(res => {
                        // console.log(res.data.payload)
                        localStorage.setItem('token', res.data.payload)
                        actions.setSubmitting(false)
                    })
                    .catch(err => {
                        console.log(err.response)
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

                        </Form>

                        <Message floating>
                        <Icon name='help' />
                            Don't Have an Account?&nbsp;<a href='#'>Signup here</a>&nbsp;and get started!
                        </Message>

                    </Grid.Column>
                </Grid>
            )}        
        
        />
    )
}

const UserSignUpSchema = Yup.object().shape({

    username: Yup.string()
        .notOneOf(['waffle@syrup.com'], "That email is already taken.")
        .required('You must participate if you want the goods'),
    password: Yup.string()
        .min(3, 'Not Long Enough')
        .max(15, 'Slow Down Partner')
        .required('You must participate if you want the goods')
})

export default Login;    