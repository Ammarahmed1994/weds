import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Jumbotron, Container, Button } from 'react-bootstrap';


class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            redirect: null,
        };
    }

    async handleClick(component) {
        this.setState({ redirect: `/blog/${component}` });
    }

    render() {
        const { redirect } = this.state;
        return (
            <>
                <div className="dash">
                    <Jumbotron >
                        <Container>
                            <h1>Welcome to Weds App Assessment</h1>
                        </Container>
                    </Jumbotron>
                    <Button variant="primary" size="lg" block onClick={() => this.handleClick(`new`)}>Create Blog</Button>
                    <Button variant="secondary" size="lg" block onClick={() => this.handleClick(`list`)}>View Blog List</Button>
                </div>
                {
                    redirect && <Redirect to={redirect} />
                }
            </>
        )
    }
}

export default Dashboard;