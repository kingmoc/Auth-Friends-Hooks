import React from 'react';
import Friend from './Friend';
import { Grid, Card } from 'semantic-ui-react';

const FriendList = (props) => {
    console.log(props)
    return (
        <Grid>
            <Grid.Column>
                <Card.Group centered>

                    {props.friendList.map(friend => <Friend key={friend.id} friend={friend}/>)}
        
                </Card.Group>
            </Grid.Column>
        </Grid>
        
    );
};

export default FriendList;