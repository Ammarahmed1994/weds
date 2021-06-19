import React, { Component } from 'react';
import { BlogService } from '../shared/services/blog.service';
import FileBase64 from 'react-file-base64';
import { Card, Button } from 'react-bootstrap';


class Main extends Component {

    constructor() {
        super();
        this.state = {
            blogs: [],
        };
    }
    async componentDidMount() {
        const blogs = await BlogService.getBlogList();
        this.setState({
            blogs
        })
        console.log(`hfjsdhf`, this.state.blogs);
    }

    getFile(file) {
        console.log(`file`, file);
    }

    render() {
        const blogs = this.state.blogs;
        return (
            <div >
                {/* <FileBase64
                    multiple={false}
                    onDone={this.getFile.bind(this)} /> */}

                {
                    blogs.map((blog, _id) => (
                        <div key={_id}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={blog.article_image} />
                                <Card.Body>
                                    <Card.Title>{blog.article_tile}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{blog.author_name}</Card.Subtitle>
                                    <Card.Subtitle className="mb-2 text-muted">{blog.article_date}</Card.Subtitle>
                                    <Card.Text> {blog.article_body}</Card.Text>
                                    <Button variant="primary">Go somewhere</Button>
                                </Card.Body>
                            </Card>
                            {/* <p>{blog._id}</p>
                            <img src={blog.article_image} /> */}

                        </div>
                    ))
                }
            </div>
        );
    }
}

export default Main;