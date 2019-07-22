import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { Button, Form, Grid, Icon, Header, Segment, } from 'semantic-ui-react'
import * as Yup from "yup";
import { axiosWithAuth } from './utilities/axiosWithAuth'


const FriendForm = (props) => {
    // console.log(props.friendToEdit[0].name)

    return (

        <Formik 
        
            initialValues = {{
                // id: Math.floor(Math.random() * (92) + 8),
                name: props.editClick ? props.friendToEdit[0].name : "",
                age: props.editClick ? props.friendToEdit[0].age : "",
                email:props.editClick ? props.friendToEdit[0].email : "",
                editClick: props.editClick
            }}
            onSubmit={(values, actions) => {
                console.log(values)
                // actions.resetForm()

                if(values.editClick) {
                    setTimeout(() => {
                        axiosWithAuth()
                        .put(`/friends/${props.friendToEdit[0].id}`, values)
                        .then(res => {
                            console.log(res)
                            props.editFriend(res.data)
                            actions.setSubmitting(false)
                        })
                        .catch(err => {
                            console.log(err.response)
                        })         
                    }, 1500)
                } else {
                    axiosWithAuth()
                        .post('/friends', values)
                        .then(res => {
                            actions.resetForm()
                            console.log(res.data)
                            props.addFriend(res.data)
                            actions.setSubmitting(false)
                        })
                        .catch(err => {
                            console.log(err.response)
                        })
                }
            }}

            validationSchema={UserSignUpSchema}
        
            render = {({ values, handleSubmit, handleChange, errors, touched, isSubmitting, ...props }) => (
                <Segment>
                {console.log(isSubmitting)}
                    <Grid  verticalAlign='middle' textAlign='center'>
                        
                        <Grid.Column width={10}>

                            <Header as='h1' color='orange' textAlign='center'>
                                {values.editClick ? 'Edit Friend' : 'Add A Friend'}
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
                                    <Button.Content visible>{values.editClick ? 'Edit Friend' : 'Add Friend'}</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='arrow right' />
                                    </Button.Content>                                
                                </Button>

                                {isSubmitting && <Header color='orange' size='medium'>Updating Changes</Header>}

                            </Form>

                        </Grid.Column>
                    </Grid>
                </Segment>
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
        .required('You must participate if you want the goods')
})

export default FriendForm;    