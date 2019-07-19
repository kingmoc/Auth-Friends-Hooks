import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { Button, Form, Grid, Icon, Header, } from 'semantic-ui-react'
import * as Yup from "yup";
import { axiosWithAuth } from './utilities/axiosWithAuth'


const FriendForm = (props) => {
    console.log(props)

    return (

        <Formik 
        
            initialValues = {{
                id: Math.floor(Math.random() * (92) + 8),
                name: "",
                age: "",
                email:""
            }}
            onSubmit={(values, actions) => {
                console.log(values)
                actions.resetForm()

                axiosWithAuth()
                .post('/friends', values)
                .then(res => {
                    console.log(res.data)
                    props.addFriend(res.data)
                    actions.setSubmitting(false)
                })
                .catch(err => {
                    console.log(err.response)
                })
            }}

            validationSchema={UserSignUpSchema}
        
            render = {({ values, handleSubmit, handleChange, errors, touched, isSubmitting, ...props }) => (
                <Grid  verticalAlign='middle' textAlign='center' stackable>
                    
                    <Grid.Column width={10}>

                        <Header as='h1' color='orange' textAlign='center'>
                            Add A Friend
                        </Header>

                        <Form onSubmit={handleSubmit} size='big'>

                             <Form.Input   
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={values.name}
                                onChange={handleChange}
                                error={touched.name && errors.name}
                            />

                            <Form.Input
                                type="text"
                                name="age"
                                placeholder="Age"
                                value={values.age}
                                onChange={handleChange}
                                error={touched.age && errors.age}
                            />

                            <Form.Input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={values.email}
                                onChange={handleChange}
                                error={touched.email && errors.email}
                            />

                            <Button 
                                color='brown' 
                                animated
                                type='submit' 
                                fluid
                                loading={isSubmitting}
                                size='big'
                            >
                                <Button.Content visible>Add Friend</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='arrow right' />
                                </Button.Content>                                
                            </Button>

                        </Form>

                    </Grid.Column>
                </Grid>
            )}        
        
        />
    )
}

const UserSignUpSchema = Yup.object().shape({

    name: Yup.string()
        .required('You must participate if you want the goods'),
    age: Yup.string()
    .required('You must participate if you want the goods'),
    email: Yup.string()
        .email()
        .min(3, 'Not Long Enough')
        .max(15, 'Slow Down Partner')
        .required('You must participate if you want the goods')
})

export default FriendForm;    