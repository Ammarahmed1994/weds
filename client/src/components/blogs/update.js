import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Form, Button, Container, Card, Modal, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import moment from 'moment';
import { BlogService } from '../shared/services/blog.service';


export default function BlogUpdate(props) {
    const { register, handleSubmit } = useForm();
    const [baseImage, setBaseImage] = useState("");
    const [redirect, setRedirect] = useState(null);
    const [blog, setBlog] = useState({});
    const [show, setShow] = useState(false);
    const [deleteShow, setDeleteShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDeleteClose = () => setDeleteShow(false);
    const handleDeleteShow = () =>{
        setDeleteShow(true);
        console.log(deleteShow)
    } 

    const id = props.match.params.id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await BlogService.getBlogById(id);
                setBlog(data);
            }
            catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setBaseImage(base64);
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const onSubmit = async (data) => {
        try {

            const updatedBlog = {
                author_name: data.author_name ? data.author_name : blog.author_name,
                article_title: data.article_title ? data.article_title : blog.article_title,
                article_body: data.article_body ? data.article_body : blog.article_body,
                article_date: data.article_date ? moment(data.article_date).format('ll') : moment(blog.data.article_date).format('ll'),
                _id: id
            }

            Object.assign(updatedBlog, { article_image: baseImage ? baseImage : blog.article_image })

            await BlogService.update(updatedBlog);
            setRedirect(`/blog/list`);
        } catch (error) {
            console.log(error)
        }
    }

const onDelete = async () => {
    try {
        await BlogService.deleteBlog(id);
        setRedirect(`/blog/list`);
    } catch (error) {
        console.log(error)
    }
}

    return (
        <>
            <Container>
                <Card style={{ width: '70rem' }}>
                    <Card.Title>{blog.article_title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">By: {blog.author_name}</Card.Subtitle>
                    <Card.Img variant="top" src={blog.article_image} />
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">{blog.article_date}</Card.Subtitle>
                        <Form.Group >
                            <Form.Control as="textarea" rows={3} defaultValue={blog.article_body} />
                        </Form.Group>
                        <Row>
                        <Button variant="primary" onClick={handleShow}>open Update Modal</Button>
                        <Button variant="danger" onClick={handleDeleteShow}>open Delete Modal</Button>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
            {
                show == true ? <Modal show={show} onHide={handleClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Update {blog.article_title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group >
                                <Form.Label>Author Name</Form.Label>
                                <Form.Control  {...register("author_name")} type="text" placeholder="Author Name" defaultValue={blog.author_name} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Article Title</Form.Label>
                                <Form.Control  {...register("article_title")} type="text" placeholder="Article Title" defaultValue={blog.article_title} />
                            </Form.Group>

                            <Form.Group>
                                <Form.File id="exampleFormControlFile1" label="Article Image" onChange={(e) => { uploadImage(e); }} />
                            </Form.Group>

                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Article Body</Form.Label>
                                <Form.Control as="textarea" rows={15} {...register("article_body")} defaultValue={blog.article_body} />
                            </Form.Group>

                            <Form.Group >
                                <Form.Label>Article Date</Form.Label>
                                <Form.Control  {...register("article_date")} type="date"
                                    defaultValue={moment(blog.article_date).format("YYYY-MM-DD")}
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSubmit(onSubmit)}>
                            update
                        </Button>
                    </Modal.Footer>
                </Modal>
                    : ``
            }
            {
                deleteShow == true ?  
                <Modal show={deleteShow} onHide={handleDeleteClose} animation={true}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete {blog.article_title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Would you like to delete this blog?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleDeleteClose}>Close</Button>
                            <Button variant="danger" onClick={handleSubmit(onDelete)}>Delete</Button>
                        </Modal.Footer>
                    </Modal> : ``
            }


            {redirect && <Redirect to={redirect} />}

        </>
    )
}
