import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { BlogService } from '../shared/services/blog.service';

import { Card, Button, Container, Jumbotron } from 'react-bootstrap';
import ReadMoreReact from 'read-more-react';


class BlogList extends Component {

    constructor() {
        super();
        this.state = {
            blogs: [],
            redirect: null
        };
    }
    async componentDidMount() {
        const blogs = await BlogService.getBlogList();
        this.setState({
            blogs
        })
        console.log(`hfjsdhf`, this.state.blogs);
    }

    async handleClick(id) {
        this.setState({ redirect: `/blog/${id}/details` });
    }

    render() {
        const blogs = this.state.blogs;
        const redirect = this.state.redirect;
        return (
            <div >
                <Jumbotron fluid>
                    <h1 style={{ textAlign: "center" }}>List of Blogs</h1>
                </Jumbotron>
                {
                    blogs.map((blog, _id) => (
                        <div key={_id}>
                            <Container>
                                <Card style={{ width: '70rem' }}>
                                    <Card.Title>{blog.article_title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">By: {blog.author_name}</Card.Subtitle>
                                    <Card.Img variant="top" src={blog.article_image} />
                                    <Card.Body>
                                        {/* <Card.Title>{blog.article_title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{blog.author_name}</Card.Subtitle> */}
                                        <Card.Subtitle className="mb-2 text-muted">{blog.article_date}</Card.Subtitle>
                                        <Card.Text> <ReadMoreReact text={blog.article_body}
                                            min={80}
                                            ideal={100}
                                            max={200}
                                            readMoreText="click here to read more" /></Card.Text>
                                        <Button variant="outline-secondary" size="lg" block onClick={() => this.handleClick(blog._id)}>Details Page</Button>
                                    </Card.Body>
                                </Card>
                            </Container>

                        </div>

                    ))
                }
                {
                    redirect && <Redirect to={redirect} />
                }
            </div>

        );

    }
}

export default BlogList;