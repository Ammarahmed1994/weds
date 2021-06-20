import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import moment from 'moment';
import { Form, Button, Container, Jumbotron } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import { BlogService } from '../shared/services/blog.service';

export default function BlogNew() {
    const { register, handleSubmit } = useForm();
    const [baseImage, setBaseImage] = useState("");
    const [redirect, setRedirect] = useState(null);

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
            data.article_date = moment(data.article_date).format('ll');

            let newBlog = data;
            Object.assign(newBlog, { article_image: baseImage })

            await BlogService.create(newBlog);
            setRedirect(`/blog/list`)
        } catch (err) {
            console.log(err)
        }
    }

    const handleClick = () => {
        setRedirect(`/`);
    }

    return (
        <>
            <Button variant="dark" size="lg" block onClick={handleClick}>Home Page</Button>
            <Jumbotron fluid>
                <h1 style={{ textAlign: "center" }}>New Blog Page</h1>
            </Jumbotron>
            <Container>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Author Name</Form.Label>
                        <Form.Control  {...register("author_name")} type="text" placeholder="Author Name" />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Article Title</Form.Label>
                        <Form.Control  {...register("article_title")} type="text" placeholder="Article Title" />
                    </Form.Group>

                    <Form.Group>
                        <Form.File id="exampleFormControlFile1" label="Article Image" onChange={(e) => { uploadImage(e); }} />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Article Body</Form.Label>
                        <Form.Control as="textarea" rows={3} {...register("article_body")} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Article Date</Form.Label>
                        <Form.Control  {...register("article_date")} type="date" placeholder="Author Name" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
            {redirect && <Redirect to={redirect} />}

        </>
    )
}
