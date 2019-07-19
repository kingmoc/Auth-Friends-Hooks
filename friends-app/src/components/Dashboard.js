import React, { useEffect, useState } from 'react';
import FriendList from './FriendList'
import { axiosWithAuth } from './utilities/axiosWithAuth'
import { Dimmer, Loader, Grid } from 'semantic-ui-react';
import FriendForm from './FriendForm';

const Dashboard = () => {

    const[friendList, setFriendList] = useState(null)
    const[isFecthing, setIsFetching] = useState(false)

    useEffect(() => {
        setIsFetching(true)

        axiosWithAuth()
            .get('/friends')
            .then(res => {
                console.log(res.data)

                setTimeout(() => {
                    setFriendList(res.data)
                }, 1500)
                setIsFetching(false)
            })
            .catch(err => {
                console.log(err.response)
            })
    }, [])

    const addFriend = (newFriendList) => {
        setFriendList(newFriendList)
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
                <h1> DashBoard </h1>
                <Grid verticalAlign='middle' textAlign='center' divided stackable>

                    <Grid.Column width={6}>
                        <FriendForm addFriend={addFriend}/>
                    </Grid.Column>

                    <Grid.Column width={10}>
                        <FriendList friendList={friendList}/>
                    </Grid.Column>

                </Grid>
                
            </div>
        );
    }
};

export default Dashboard;