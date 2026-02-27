import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

const Updatebook = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [updatebook, setUpdateBook] = useState({
    book: { title: "", author: "", isbn: "", pubdate: "" },
    author: { name: "", dob: "", biography: "" },
  });

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
      const res = await axios.get(
        `https://6659bac3de346625136db076.mockapi.io/api/book/${id}`
      );
      setUpdateBook(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    formik.setValues(updatebook);
  }, [updatebook]);

  const validationschema = Yup.object({
    book: Yup.object({
      title: Yup.string().required("Book title is required"),
      author: Yup.string().required("Author name is required"),
      isbn: Yup.string().required("ISBN is required"),
      pubdate: Yup.date().required("Publication date is required"),
    }),
    author: Yup.object({
      name: Yup.string().required("Author name is required"),
      dob: Yup.date().required("Date of birth is required"),
      biography: Yup.string().required("Biography is required"),
    }),
  });

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      await axios.put(
        `https://6659bac3de346625136db076.mockapi.io/api/book/${id}`,
        values
      );
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  let formik = useFormik({
    initialValues: {
      book: { title: "", author: "", isbn: "", pubdate: "" },
      author: { name: "", dob: "", biography: "" },
    },
    validationSchema: validationschema,
    onSubmit: handleSubmit,
  });

  const Field = ({ label, name, type = "text", value, error }) => (
    <div className="ub-field">
      <label className="ub-label">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`ub-input${error ? " ub-input--err" : ""}`}
      />
      {error && <span className="ub-error">{error}</span>}
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .ub-root {
          min-height: 100vh;
          background: linear-gradient(135deg, #e8f5f0 0%, #f0e8f5 50%, #f5f0e8 100%);
          font-family: 'DM Sans', sans-serif;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 2rem 1rem 4rem;
        }

        .ub-wrapper {
          width: 100%;
          max-width: 780px;
          animation: fadeUp 0.45s ease both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Page title ── */
        .ub-page-header {
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .ub-back-btn {
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 8px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #555;
          transition: background 0.15s;
          flex-shrink: 0;
        }
        .ub-back-btn:hover { background: #f3f3f3; }

        .ub-page-title {
          font-family: 'Fraunces', serif;
          font-size: clamp(1.4rem, 4vw, 2rem);
          color: #1a1a2e;
        }

        .ub-page-title span { color: #7c3aed; }

        /* ── Card ── */
        .ub-card {
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.09);
          overflow: hidden;
        }

        /* ── Section headers ── */
        .ub-section {
          padding: 1.5rem 1.75rem 0;
        }

        .ub-section-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #7c3aed;
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid #f0eaff;
        }

        .ub-section-label svg { flex-shrink: 0; }

        /* ── Grid layout ── */
        .ub-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem 1.25rem;
        }

        .ub-grid .ub-field--full {
          grid-column: 1 / -1;
        }

        /* ── Fields ── */
        .ub-field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .ub-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: #374151;
        }

        .ub-input {
          padding: 0.65rem 0.9rem;
          border: 1.5px solid #e5e7eb;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          color: #1a1a2e;
          background: #fafafa;
          transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
          width: 100%;
        }

        .ub-input:focus {
          outline: none;
          border-color: #7c3aed;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(124,58,237,0.1);
        }

        .ub-input--err {
          border-color: #ef4444;
          background: #fff8f8;
        }

        .ub-input--err:focus {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239,68,68,0.1);
        }

        .ub-error {
          font-size: 0.75rem;
          color: #ef4444;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        /* ── Divider ── */
        .ub-divider {
          height: 1px;
          background: #f3f4f6;
          margin: 1.5rem 1.75rem;
        }

        /* ── Footer ── */
        .ub-footer {
          padding: 1.25rem 1.75rem 1.75rem;
          display: flex;
          gap: 0.75rem;
          justify-content: flex-end;
          flex-wrap: wrap;
        }

        .ub-btn-cancel {
          padding: 0.65rem 1.4rem;
          border-radius: 10px;
          border: 1.5px solid #e5e7eb;
          background: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          color: #6b7280;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
        }

        .ub-btn-cancel:hover { background: #f9fafb; color: #374151; }

        .ub-btn-submit {
          padding: 0.65rem 1.75rem;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: opacity 0.15s, transform 0.12s, box-shadow 0.15s;
          box-shadow: 0 4px 14px rgba(124,58,237,0.35);
        }

        .ub-btn-submit:hover:not(:disabled) {
          opacity: 0.92;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(124,58,237,0.4);
        }

        .ub-btn-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        /* ── Loading skeleton ── */
        .ub-skeleton-wrap { padding: 1.75rem; }
        .ub-skel {
          height: 52px;
          border-radius: 10px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.2s infinite;
          margin-bottom: 1rem;
        }
        .ub-skel-sm { height: 16px; width: 40%; margin-bottom: 1.5rem; }

        @keyframes shimmer {
          from { background-position: 200% 0; }
          to   { background-position: -200% 0; }
        }

        /* ── Responsive: single column on mobile ── */
        @media (max-width: 560px) {
          .ub-root { padding: 1rem 0.75rem 3rem; }
          .ub-grid { grid-template-columns: 1fr; }
          .ub-section { padding: 1.25rem 1.25rem 0; }
          .ub-divider { margin: 1.25rem; }
          .ub-footer { padding: 1rem 1.25rem 1.25rem; justify-content: stretch; }
          .ub-btn-cancel, .ub-btn-submit { flex: 1; justify-content: center; }
        }
      `}</style>

      <div className="ub-root">
        <div className="ub-wrapper">
          <div className="ub-page-header">
            <button className="ub-back-btn" onClick={() => navigate("/dashboard")}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <h1 className="ub-page-title">Update <span>Book</span></h1>
          </div>

          <div className="ub-card">
            {loading ? (
              <div className="ub-skeleton-wrap">
                <div className="ub-skel ub-skel-sm" />
                <div className="ub-skel" />
                <div className="ub-skel" />
                <div className="ub-skel" />
                <div className="ub-skel ub-skel-sm" style={{marginTop:'1.5rem'}} />
                <div className="ub-skel" />
                <div className="ub-skel" />
              </div>
            ) : (
              <form onSubmit={formik.handleSubmit} noValidate>
                {/* ── Book Details ── */}
                <div className="ub-section">
                  <div className="ub-section-label">
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                    </svg>
                    Book Details
                  </div>
                  <div className="ub-grid">
                    <Field
                      label="Book Title"
                      name="book.title"
                      value={formik.values.book.title}
                      error={formik.touched.book?.title && formik.errors.book?.title}
                    />
                    <Field
                      label="Author"
                      name="book.author"
                      value={formik.values.book.author}
                      error={formik.touched.book?.author && formik.errors.book?.author}
                    />
                    <Field
                      label="ISBN"
                      name="book.isbn"
                      value={formik.values.book.isbn}
                      error={formik.touched.book?.isbn && formik.errors.book?.isbn}
                    />
                    <Field
                      label="Publication Date"
                      name="book.pubdate"
                      type="date"
                      value={formik.values.book.pubdate}
                      error={formik.touched.book?.pubdate && formik.errors.book?.pubdate}
                    />
                  </div>
                </div>

                <div className="ub-divider" />

                {/* ── Author Details ── */}
                <div className="ub-section">
                  <div className="ub-section-label">
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
                    </svg>
                    Author Details
                  </div>
                  <div className="ub-grid">
                    <Field
                      label="Full Name"
                      name="author.name"
                      value={formik.values.author.name}
                      error={formik.touched.author?.name && formik.errors.author?.name}
                    />
                    <Field
                      label="Date of Birth"
                      name="author.dob"
                      type="date"
                      value={formik.values.author.dob}
                      error={formik.touched.author?.dob && formik.errors.author?.dob}
                    />
                    <div className="ub-field ub-field--full">
                      <label className="ub-label">Biography</label>
                      <textarea
                        name="author.biography"
                        value={formik.values.author.biography}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        rows={3}
                        className={`ub-input${formik.touched.author?.biography && formik.errors.author?.biography ? " ub-input--err" : ""}`}
                        style={{ resize: "vertical", lineHeight: "1.5" }}
                      />
                      {formik.touched.author?.biography && formik.errors.author?.biography && (
                        <span className="ub-error">{formik.errors.author.biography}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* ── Footer ── */}
                <div className="ub-footer">
                  <button
                    type="button"
                    className="ub-btn-cancel"
                    onClick={() => navigate("/dashboard")}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="ub-btn-submit"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{animation:'spin 0.75s linear infinite'}}>
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"/>
                        </svg>
                        Saving…
                      </>
                    ) : (
                      <>
                        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                        </svg>
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
};

export default Updatebook;