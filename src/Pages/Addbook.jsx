import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const Addbook = () => {
  //initialvalues
  const initialValues = {
    book: {
      title: "",
      author: "",
      isbn: "",
      pubdate: "",
    },
    author: {
      name: "",
      dob: "",
      biography: "",
    },
  };
  //validationschema 
  const validationschema = Yup.object().shape({
    book: Yup.object().shape({
      title: Yup.string().required("Field is empty"),
      author: Yup.string().required("Field is empty"),
      isbn: Yup.string()
        .required("Field is empty"),
      pubdate: Yup.string().required("Field is empty"),
    }),
    author: Yup.object().shape({
      name: Yup.string().required("Field is empty"),
      dob: Yup.string().required("Field is empty"),
      biography: Yup.string().required("Field is empty"),
    }),
    id: Yup.string().required("Field is empty"),
  });

  const navigate = useNavigate();
  //handlesubmit 
  const handleSubmit = async (values) => {
    console.log(values);
    await axios
      .post("https://6659bac3de346625136db076.mockapi.io/api/book/", values)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
      alert("New Book Details are added successfully 📚")
    navigate("/dashboard");
  };

  return (
    //create book details
    <div className="section">
      <div className="container bg-primary-subtle col-md-10 col-sm-7">
        <h4 className="text-center text-success">Add Book</h4>
        <Formik
          initialValues={initialValues}
          validationSchema={validationschema}
          onSubmit={handleSubmit}
        >
          <Form className="m-5">
            <div>
              <label>Id :</label>
              <Field
                type="text"
                name="id"
                className="form-control"
                placeholder="Enter your book id"
              />
              <ErrorMessage
                name="id"
                component="h6"
                className="error_message"
              />
            </div>
            <div>
              <label>Book_Title :</label>
              <Field
                type="text"
                name="book.title"
                className="form-control"
                placeholder="Title of book"
              />
              <ErrorMessage
                name="book.title"
                component="h6"
                className="error_message"
              />
            </div>

            <div>
              <label>Book_Author :</label>
              <Field
                type="text"
                name="book.author"
                className="form-control"
                placeholder="Author of book"
              />
              <ErrorMessage
                name="book.author"
                component="h6"
                className="error_message"
              />
            </div>

            <div>
              <label>Book_ISBN :</label>
              <Field type="text" 
              name="book.isbn" 
               className="form-control"
              placeholder="ISBN number" />
              <ErrorMessage
                name="book.isbn"
                component="h6"
                className="error_message"
              />
            </div>

            <div>
              <label>Book_Pubdate:</label>
              <Field
                type="date"
                name="book.pubdate"
                 className="form-control"
                placeholder="publication Date"
              />
              <ErrorMessage
                name="book.pubdate"
                component="h6"
                className="error_message"
              />
            </div>

            <div>
             
              <label>Author_name :</label>
              <Field
                type="text"
                name="author.name"
                 className="form-control"
                placeholder="Author's Name"
              />
              <ErrorMessage
                name="author.name"
                component="h6"
                className="error_message"
              />
            </div>

            <div>
              <label>Author_dob :</label>
              <Field type="date"
               name="author.dob"
                className="form-control"
               placeholder="Author's DOB" />
              <ErrorMessage
                name="author.dob"
                component="h6"
                className="error_message"
              />
            </div>

            <div>
              <label>Author_Bio :</label>
              <Field
                type="text"
                name="author.biography"
                 className="form-control"
                placeholder="Description about author"
              />
              <ErrorMessage
                name="author.biography"
                component="h6"
                className="error_message"
              />
            </div>

            <button className="btn btn-success m-4" type="submit">Add Book</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Addbook;
