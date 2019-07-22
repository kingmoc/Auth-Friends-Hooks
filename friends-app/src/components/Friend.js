import React, { useState } from 'react';
import { Card, Image, Button, Grid, Modal, Icon } from 'semantic-ui-react';
import FriendForm from '../components/FriendForm'

const Friend = (props) => {
    console.log(props)

    const[modalOPen, setModalOpen] = useState(false)

    const edit = () => {
        props.getFriend(props.friend.id)
    }

    const deleteF = () => {
        props.deleteFriend(props.friend.id)
    }

    return (

        <Card>

            <Card.Content>
                <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
                <Card.Header>{props.friend.name}</Card.Header>
                <Card.Meta>{props.friend.email}</Card.Meta>
                <Card.Description> I'm {props.friend.age} years old! Please don't tell anyone.</Card.Description>
            </Card.Content>

            <Card.Content extra>
                <div className='ui two buttons'>

                    <Modal 
                        trigger={                    
                            <Button onClick={edit} basic color='green'>
                                Edit
                            </Button>
                        }
                        closeIcon
                    >
                        <Modal.Content>
                            <FriendForm 
                                editClick={props.editClick} 
                                friendToEdit={props.friendToEdit}
                                editFriend={props.editFriend}
                            />
                        </Modal.Content>
                    </Modal>

                    <Modal
                        trigger={
                            <Button 
                                basic 
                                color='red'
                                onClick={() => setModalOpen(true)}
                            >
                                Delete
                            </Button>
                        }
                        size='small'
                        open={modalOPen}
                        onClose={() => setModalOpen(false)}
                    >
                        <Modal.Header>Delete Your Friend <Icon name='trash alternate' /></Modal.Header>
                        <Modal.Content>
                            <p>Are you sure you want to delete your Friend?</p>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button negative onClick={() => {setModalOpen(false)}}>No</Button>
                            <Button 
                                positive 
                                icon='checkmark' 
                                labelPosition='right' 
                                content='Yes'
                                onClick={deleteF} 
                            />
                        </Modal.Actions>
                    </Modal>

                </div>
            </Card.Content>

        </Card>

    );
};

export default Friend;