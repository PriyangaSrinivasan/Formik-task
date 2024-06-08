import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
const Updatebook = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [updatebook, setUpdateBook] = useState({
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
  });

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    await axios
      .get(`https://6659bac3de346625136db076.mockapi.io/api/book/${id}`)
      .then((res) => setUpdateBook(res.data))
      .catch((error) => console.log("error"));
  };

  useEffect(() => {
    formik.setValues(updatebook);
  }, [updatebook]);

  const validationschema = Yup.object({
    book: Yup.object({
      title: Yup.string().required("Field is empty"),
      author: Yup.string().required("Field is empty"),
      isbn: Yup.string()
        .required("Field is empty"),
      pubdate: Yup.date().required("Field is empty"),
    }),
    author: Yup.object({
      name: Yup.string().required("Field is empty"),
      dob: Yup.date().required("Field is empty"),
      biography: Yup.string().required("Field is empty"),
    }),
  });

  const handleSubmit = async (values) => {
    //console.log(values);
    await axios
      .put(`https://6659bac3de346625136db076.mockapi.io/api/book/${id}`, values)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
      alert("Book details are updated successfully 👍")
    navigate("/dashboard");
  };

  let formik = useFormik({
    initialValues: {
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
    },
    validationSchema: validationschema,
    onSubmit: handleSubmit,
  });

  return (
    //edit book details 
    <div className="section">
      <div className="container bg-primary-subtle">
        <h4 className="text-center text-primary">Update Book</h4>
        <form onSubmit={formik.handleSubmit} className="m-4">
          <div>
            <label>Book Name :</label>
            <input
              type="text"
              name="book.title"
              value={formik.values.book.title}
              onChange={formik.handleChange}
              className="form-control"
            />
            {formik.errors.book?.title ? (
              <div className="error_message">{formik.errors.book.title}</div>
            ) : null}
          </div>
          <div>
            <label>Author name :</label>
            <input
              type="text"
              name="book.author"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.book.author}
            />
            {formik.errors.book?.author ? (
              <div className="error_message">{formik.errors.book.author}</div>
            ) : null}
          </div>
          <div>
            <label>ISBN :</label>
            <input
              type="text"
              name="book.isbn"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.book.isbn}
            />
            {formik.errors.book?.isbn ? (
              <div className="error_message">{formik.errors.book.isbn}</div>
            ) : null}
          </div>
          <div>
            <label>Pub Date :</label>
            <input
              type="date"
              name="book.pubdate"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.book.pubdate}
            />
            {formik.errors.book?.pubdate ? (
              <div className="error_message">{formik.errors.book.pubdate}</div>
            ) : null}
          </div>

          <div>
            <label>Name of Author :</label>
            <input
              type="text"
              name="author.name"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.author.name}
            />
            {formik.errors.author?.name ? (
              <div className="error_message">{formik.errors.author.name}</div>
            ) : null}
          </div>
          <div>
            <label>Date of Birth :</label>
            <input
              type="date"
              name="author.dob"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.author.dob}
            />
            {formik.errors.author?.dob ? (
              <div className="error_message">{formik.errors.author.dob}</div>
            ) : null}
          </div>
          <div>
            <label>Biography :</label>
            <input
              type="text"
              name="author.biography"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.author.biography}
            />
            {formik.errors.author?.biography ? (
              <div className="error_message">
                {formik.errors.author.biography}
              </div>
            ) : null}
          </div>
          <button className="btn btn-primary m-4" type="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Updatebook;
