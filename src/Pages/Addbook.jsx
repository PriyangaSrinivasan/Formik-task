import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const Addbook = () => {
  const initialValues = {
    book: { title: "", author: "", isbn: "", pubdate: "" },
    author: { name: "", dob: "", biography: "" },
    id: "",
  };

  const validationschema = Yup.object().shape({
    book: Yup.object().shape({
      title: Yup.string().required("Field is empty"),
      author: Yup.string().required("Field is empty"),
      isbn: Yup.string().required("Field is empty"),
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

  const handleSubmit = async (values) => {
    await axios
      .post("https://6659bac3de346625136db076.mockapi.io/api/book/", values)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    alert("New Book Details are added successfully 📚");
    navigate("/dashboard");
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    border: "1.5px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "15px",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
    background: "#fff",
  };

  const labelStyle = {
    display: "block",
    fontWeight: "600",
    marginBottom: "5px",
    fontSize: "14px",
    color: "#374151",
  };

  const errorStyle = {
    color: "#ef4444",
    fontSize: "12px",
    marginTop: "4px",
  };

  const fieldGroup = {
    marginBottom: "18px",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@500;700&family=Source+Sans+3:wght@400;600&display=swap');

        * { box-sizing: border-box; }

        .addbook-wrapper {
          min-height: 100vh;
          background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #f0f9ff 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          font-family: 'Source Sans 3', sans-serif;
        }

        .addbook-card {
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.10);
          width: 100%;
          max-width: 820px;
          overflow: hidden;
        }

        .addbook-header {
          background: linear-gradient(135deg, #16a34a, #0d9488);
          padding: 28px 36px 24px;
          text-align: center;
        }

        .addbook-header h2 {
          font-family: 'Lora', serif;
          color: #fff;
          margin: 0;
          font-size: clamp(22px, 4vw, 32px);
          letter-spacing: 0.5px;
        }

        .addbook-header p {
          color: rgba(255,255,255,0.8);
          margin: 6px 0 0;
          font-size: 14px;
        }

        .addbook-form {
          padding: 32px 36px;
        }

        @media (max-width: 600px) {
          .addbook-form {
            padding: 20px 16px;
          }
          .addbook-header {
            padding: 20px 16px 18px;
          }
        }

        .section-title {
          font-family: 'Lora', serif;
          font-size: 16px;
          color: #16a34a;
          font-weight: 700;
          margin: 0 0 14px;
          padding-bottom: 6px;
          border-bottom: 2px solid #dcfce7;
        }

        .form-section {
          background: #f9fafb;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 20px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 20px;
        }

        @media (max-width: 580px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
        }

        .field-input {
          width: 100%;
          padding: 10px 14px;
          border: 1.5px solid #d1d5db;
          border-radius: 8px;
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          background: #fff;
          font-family: 'Source Sans 3', sans-serif;
        }

        .field-input:focus {
          border-color: #16a34a;
          box-shadow: 0 0 0 3px rgba(22,163,74,0.1);
        }

        .submit-btn {
          width: 100%;
          padding: 13px;
          background: linear-gradient(135deg, #16a34a, #0d9488);
          color: #fff;
          font-size: 16px;
          font-weight: 700;
          font-family: 'Source Sans 3', sans-serif;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          letter-spacing: 0.5px;
          transition: opacity 0.2s, transform 0.15s;
          margin-top: 8px;
        }

        .submit-btn:hover {
          opacity: 0.92;
          transform: translateY(-1px);
        }

        .submit-btn:active {
          transform: translateY(0);
        }

        .id-section {
          margin-bottom: 20px;
        }
      `}</style>

      <div className="addbook-wrapper">
        <div className="addbook-card">
          <div className="addbook-header">
            <h2>📚 Add New Book</h2>
            <p>Fill in the details below to add a book to the library</p>
          </div>

          <div className="addbook-form">
            <Formik
              initialValues={initialValues}
              validationSchema={validationschema}
              onSubmit={handleSubmit}
            >
              <Form>
                {/* Book ID */}
                <div className="id-section">
                  <div style={fieldGroup}>
                    <label style={labelStyle}>Book ID</label>
                    <Field
                      type="text"
                      name="id"
                      className="field-input"
                      placeholder="Enter unique book ID"
                    />
                    <ErrorMessage name="id" render={(msg) => <div style={errorStyle}>{msg}</div>} />
                  </div>
                </div>

                {/* Book Details */}
                <div className="form-section">
                  <h3 className="section-title">Book Details</h3>
                  <div className="form-grid">
                    <div style={fieldGroup}>
                      <label style={labelStyle}>Title</label>
                      <Field type="text" name="book.title" className="field-input" placeholder="Book title" />
                      <ErrorMessage name="book.title" render={(msg) => <div style={errorStyle}>{msg}</div>} />
                    </div>
                    <div style={fieldGroup}>
                      <label style={labelStyle}>Author</label>
                      <Field type="text" name="book.author" className="field-input" placeholder="Author name" />
                      <ErrorMessage name="book.author" render={(msg) => <div style={errorStyle}>{msg}</div>} />
                    </div>
                    <div style={fieldGroup}>
                      <label style={labelStyle}>ISBN</label>
                      <Field type="text" name="book.isbn" className="field-input" placeholder="ISBN number" />
                      <ErrorMessage name="book.isbn" render={(msg) => <div style={errorStyle}>{msg}</div>} />
                    </div>
                    <div style={fieldGroup}>
                      <label style={labelStyle}>Publication Date</label>
                      <Field type="date" name="book.pubdate" className="field-input" />
                      <ErrorMessage name="book.pubdate" render={(msg) => <div style={errorStyle}>{msg}</div>} />
                    </div>
                  </div>
                </div>

                {/* Author Details */}
                <div className="form-section">
                  <h3 className="section-title">Author Details</h3>
                  <div className="form-grid">
                    <div style={fieldGroup}>
                      <label style={labelStyle}>Author Name</label>
                      <Field type="text" name="author.name" className="field-input" placeholder="Full name" />
                      <ErrorMessage name="author.name" render={(msg) => <div style={errorStyle}>{msg}</div>} />
                    </div>
                    <div style={fieldGroup}>
                      <label style={labelStyle}>Date of Birth</label>
                      <Field type="date" name="author.dob" className="field-input" />
                      <ErrorMessage name="author.dob" render={(msg) => <div style={errorStyle}>{msg}</div>} />
                    </div>
                  </div>
                  <div style={fieldGroup}>
                    <label style={labelStyle}>Biography</label>
                    <Field
                      as="textarea"
                      name="author.biography"
                      className="field-input"
                      placeholder="Short description about the author"
                      rows={3}
                      style={{ resize: "vertical" }}
                    />
                    <ErrorMessage name="author.biography" render={(msg) => <div style={errorStyle}>{msg}</div>} />
                  </div>
                </div>

                <button type="submit" className="submit-btn">
                  ➕ Add Book
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addbook;