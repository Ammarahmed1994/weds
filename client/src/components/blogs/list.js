import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { BlogService } from '../shared/services/blog.service';

import { Card, Button } from 'react-bootstrap';


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
            <div >  {
                    blogs.map((blog, _id) => (
                        <div key={_id}>
                            <Card style={{ width: '30rem' }}>
                                <Card.Img variant="top" src={blog.article_image} />
                                <Card.Body>
                                    <Card.Title>{blog.article_title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{blog.author_name}</Card.Subtitle>
                                    <Card.Subtitle className="mb-2 text-muted">{blog.article_date}</Card.Subtitle>
                                    <Card.Text> {blog.article_body}</Card.Text>
                                    <Button variant="primary" onClick={() => this.handleClick(blog._id)}>Update</Button>
                                </Card.Body>
                            </Card>
                            {/* <p>{blog._id}</p>
                            <img src={blog.article_image} /> */}

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