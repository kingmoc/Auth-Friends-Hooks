import React, { useEffect, useState } from 'react';
import FriendList from './FriendList'
import { axiosWithAuth } from './utilities/axiosWithAuth'
import { Dimmer, Loader, Grid, Message, Segment, Button, Modal, Header } from 'semantic-ui-react';
import FriendForm from './FriendForm';

const Dashboard = (props) => {

    const[friendList, setFriendList] = useState(null)
    const[editClick, setEditClick] = useState(false)
    const[friendToEdit, setFriendToEdit] = useState()
   

    useEffect(() => {

        axiosWithAuth()
            .get('/friends')
            .then(res => {
                console.log(res.data)

                setTimeout(() => {
                    setFriendList(res.data)
                }, 1500)
            })
            .catch(err => {
                console.log(err.response)
            })
    }, [])

    const addFriend = (newFriendList) => {
        setEditClick(false)
        setFriendList(newFriendList)
    }

    const editFriend = (editedList) => {
        setFriendList(editedList)
    }

    const deleteFriend = (id) => {  

        axiosWithAuth()
            .delete(`/friends/${id}`)
            .then(res => {
                console.log(res)
                setFriendList(res.data)
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    const getFriend = (id) => {
        setEditClick(true)
        console.log(id)
        
        let eFriend = friendList.filter(friend => friend.id === id)
        setFriendToEdit(eFriend)
    }

    const logout = () => {
        localStorage.removeItem('token')
        props.history.push(`/login`)
    }

    if(friendList === null) {
       return (
        <Dimmer active>
            <Loader size='massive'>Loading</Loader>
        </Dimmer>
       )
    }

    if (friendList) {

        return (
            <div>
                <Message> <h1> DashBoard </h1> 
                    <Modal trigger={<Button>Add Friend</Button>} closeIcon>

                        <Modal.Content>
                            <FriendForm addFriend={addFriend}/>
                        </Modal.Content>

                    </Modal>
                    <Button color='black' onClick={logout}>Logout</Button>
                </Message>

                <Grid verticalAlign='middle' textAlign='center' divided stackable>

                    <Grid.Column width={10}>
                        <FriendList 
                            friendList={friendList} 
                            getFriend={getFriend} 
                            editClick={editClick} 
                            friendToEdit={friendToEdit}
                            editFriend={editFriend}
                            deleteFriend={deleteFriend}
                        />
                    </Grid.Column>

                </Grid>
                
            </div>
        );
    }
};

export default Dashboard;