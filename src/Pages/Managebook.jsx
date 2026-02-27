import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Managebook = () => {
  const [books, setBooks] = useState([]);
  const [deleteBook, setDeleteBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [deleteBook]);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://6659bac3de346625136db076.mockapi.io/api/book/"
      );
      setBooks(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/updatebook/${id}`);
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      const res = await axios.delete(
        `https://6659bac3de346625136db076.mockapi.io/api/book/${id}`
      );
      setDeleteBook(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .mb-root {
          min-height: 100vh;
          background: #0f0f13;
          font-family: 'DM Sans', sans-serif;
          padding: 2rem 1rem 4rem;
        }

        /* ── Header ── */
        .mb-header {
          max-width: 1300px;
          margin: 0 auto 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .mb-header h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.4rem, 4vw, 2.2rem);
          color: #fff;
          letter-spacing: -0.5px;
        }

        .mb-header h1 span { color: #6ee7b7; }

        .mb-badge {
          background: #1e1e28;
          color: #6ee7b7;
          border: 1px solid #2e3840;
          padding: 0.35rem 0.85rem;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.04em;
        }

        /* ── Card wrapper ── */
        .mb-card {
          max-width: 1300px;
          margin: 0 auto;
          background: #16161f;
          border: 1px solid #2a2a38;
          border-radius: 16px;
          overflow: hidden;
          animation: fadeUp 0.4s ease both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Scrollable table ── */
        .mb-table-wrap {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.875rem;
          min-width: 900px;
        }

        thead {
          background: #1e1e2e;
          border-bottom: 1px solid #2a2a38;
        }

        thead th {
          padding: 1rem 1.1rem;
          text-align: left;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #6b7280;
          white-space: nowrap;
        }

        thead th.action-col { color: #6ee7b7; }

        tbody tr {
          border-bottom: 1px solid #1e1e2e;
          transition: background 0.15s;
        }

        tbody tr:last-child { border-bottom: none; }
        tbody tr:hover { background: #1a1a28; }

        td {
          padding: 0.9rem 1.1rem;
          color: #d1d5db;
          vertical-align: middle;
        }

        .td-id {
          font-family: 'Syne', sans-serif;
          font-size: 0.8rem;
          color: #6ee7b7;
          font-weight: 700;
        }

        .td-title {
          color: #fff;
          font-weight: 600;
        }

        .td-isbn {
          font-family: monospace;
          font-size: 0.82rem;
          color: #a78bfa;
          background: #1e1a2e;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          white-space: nowrap;
        }

        .td-bio {
          max-width: 200px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          color: #9ca3af;
          font-size: 0.82rem;
        }

        /* ── Section divider inside header row ── */
        .col-section {
          background: #0f0f18;
          color: #6b7280 !important;
          font-size: 0.65rem !important;
          text-align: center !important;
          letter-spacing: 0.12em !important;
          border-left: 1px solid #2a2a38;
          border-right: 1px solid #2a2a38;
        }

        /* ── Buttons ── */
        .btn-edit, .btn-del {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.42rem 0.85rem;
          border-radius: 8px;
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.15s, transform 0.12s;
          white-space: nowrap;
        }

        .btn-edit:hover, .btn-del:hover { opacity: 0.85; transform: translateY(-1px); }
        .btn-edit:active, .btn-del:active { transform: translateY(0); }

        .btn-edit {
          background: #1a3a30;
          color: #6ee7b7;
          border: 1px solid #2d5a47;
        }

        .btn-del {
          background: #3a1a1a;
          color: #f87171;
          border: 1px solid #5a2d2d;
        }

        .btn-del:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          transform: none;
        }

        .action-cell {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        /* ── Loading ── */
        .mb-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          padding: 5rem 0;
          color: #6b7280;
        }

        .mb-spinner {
          width: 36px;
          height: 36px;
          border: 3px solid #2a2a38;
          border-top-color: #6ee7b7;
          border-radius: 50%;
          animation: spin 0.75s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── Empty state ── */
        .mb-empty {
          text-align: center;
          padding: 4rem 1rem;
          color: #6b7280;
        }

        .mb-empty svg { margin-bottom: 1rem; opacity: 0.4; }

        /* ── Responsive ── */
        @media (max-width: 600px) {
          .mb-root { padding: 1rem 0.5rem 3rem; }
          td, thead th { padding: 0.75rem 0.8rem; }
        }
      `}</style>

      <div className="mb-root">
        <div className="mb-header">
          <h1>Manage <span>Books</span></h1>
          {!loading && <span className="mb-badge">{books.length} Records</span>}
        </div>

        <div className="mb-card">
          {loading ? (
            <div className="mb-loading">
              <div className="mb-spinner" />
              <span>Loading records…</span>
            </div>
          ) : books.length === 0 ? (
            <div className="mb-empty">
              <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
              </svg>
              <p>No books found.</p>
            </div>
          ) : (
            <div className="mb-table-wrap">
              <table>
                <thead>
                  <tr>
                    {/* Book columns */}
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>ISBN</th>
                    <th>Pub Date</th>
                    {/* Author columns */}
                    <th className="col-section">Author Name</th>
                    <th>DOB</th>
                    <th>Biography</th>
                    {/* Actions */}
                    <th className="action-col" colSpan={1}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((ele, index) => (
                    <tr key={index}>
                      <td className="td-id">{ele.id}</td>
                      <td className="td-title">{ele.book?.title}</td>
                      <td>{ele.book?.author}</td>
                      <td><span className="td-isbn">{ele.book?.isbn}</span></td>
                      <td>{ele.book?.pubdate}</td>
                      <td>{ele.author?.name}</td>
                      <td>{ele.author?.dob}</td>
                      <td><div className="td-bio">{ele.author?.biography}</div></td>
                      <td>
                        <div className="action-cell">
                          <button
                            className="btn-edit"
                            onClick={() => handleEdit(ele.id)}
                          >
                            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"/>
                            </svg>
                            Edit
                          </button>
                          <button
                            className="btn-del"
                            onClick={() => handleDelete(ele.id)}
                            disabled={deletingId === ele.id}
                          >
                            {deletingId === ele.id ? (
                              <>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{animation:'spin 0.75s linear infinite'}}>
                                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                                </svg>
                                Deleting…
                              </>
                            ) : (
                              <>
                                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                                </svg>
                                Delete
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Managebook;