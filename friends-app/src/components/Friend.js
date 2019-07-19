import React from 'react';
import { Card, Image, Button, Grid } from 'semantic-ui-react';

const Friend = (props) => {
    console.log(props)

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
                    <Button basic color='green'>
                        Edit
                    </Button>
                    <Button basic color='red'>
                        Delete
                    </Button>
                </div>
            </Card.Content>

        </Card>

    );
};

export default Friend;