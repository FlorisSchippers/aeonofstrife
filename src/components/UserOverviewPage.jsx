import React from 'react';
import Container from '../glamorous/structure/Container.jsx';
import ContentContainer from '../glamorous/structure/ContentContainer.jsx';
import Sidebar from './Sidebar';
import BackButton from '../glamorous/buttons/BackButton';
import Title from '../glamorous/text/Title.jsx';
import Paragraph from '../glamorous/text/Paragraph';
import UserLink from '../glamorous/structure/UserLink';

class UserOverviewPage extends React.Component {
    constructor(props) {
        super(props);
        // Bindings
        this.state = {
            users: [],
            loading: false,
            error: null,
        };
    }

    componentDidMount() {
        this.setState({loading: true});
        let users = [];
        firestore.collection('users').get()
            .then((querySnapshot) => {
                querySnapshot.forEach(function(doc) {
                    users.push(doc.data());
                });
                this.setState({users: users});
                this.setState({loading: false});
            })
            .catch((error) => {
                this.setState({error: error});
                this.setState({loading: false});
            });
    }

    render() {
        let title = `User overview page`;
        let users = ``;
        if (this.state.error) {
            users = <Paragraph>{error.message}</Paragraph>;
        } else if (this.state.loading) {
            users = <Paragraph>Loading ...</Paragraph>;
        } else {
            users = this.state.users;
            users = users.map((user) =>
                <UserLink style={{display: 'table'}} to={'/users/' + user.nickname}
                          key={users.indexOf(user)}>{user.nickname}</UserLink>
                );
        }

        return (
            <Container>
                <BackButton to={'/'}/>
                <Sidebar/>
                <ContentContainer>
                    <Title>{title}</Title>
                    {users}
                </ContentContainer>
            </Container>
        );
    }
}

UserOverviewPage.propTypes = {};

export default UserOverviewPage;
