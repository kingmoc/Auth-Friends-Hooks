import React from 'react';
import Friend from './Friend';
import { Grid, Card } from 'semantic-ui-react';

const FriendList = (props) => {
    console.log(props)
    return (
        <Grid>
            <Grid.Column>
                <Card.Group centered>

                    {props.friendList.map(friend => 
                        <Friend 
                            key={friend.id} 
                            friend={friend} 
                            getFriend={props.getFriend} 
                            editClick={props.editClick}
                            friendToEdit={props.friendToEdit}
                            editFriend={props.editFriend}
                            deleteFriend={props.deleteFriend}
                        />
                    )}

                </Card.Group>
            </Grid.Column>
        </Grid>
        
    );
};

export default FriendList;