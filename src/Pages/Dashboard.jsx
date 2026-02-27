import axios from "axios";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .db-root {
          min-height: 100vh;
          background: #f5f0e8;
          font-family: 'DM Sans', sans-serif;
          padding: 2rem 1rem 4rem;
        }

        .db-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .db-header h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 5vw, 3rem);
          color: #1a1206;
          letter-spacing: -0.5px;
        }

        .db-header p {
          color: #7a6a52;
          margin-top: 0.4rem;
          font-size: 0.95rem;
        }

        .db-divider {
          width: 60px;
          height: 3px;
          background: #c8873a;
          margin: 0.8rem auto 0;
          border-radius: 2px;
        }

        /* ── Spinner ── */
        .db-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          padding: 5rem 0;
          color: #7a6a52;
        }

        .db-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #e8dece;
          border-top-color: #c8873a;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── Section card ── */
        .db-section {
          max-width: 1100px;
          margin: 0 auto 2.5rem;
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.07);
          animation: fadeUp 0.5s ease both;
        }

        .db-section:nth-child(2) { animation-delay: 0.1s; }
        .db-section:nth-child(3) { animation-delay: 0.2s; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .db-section-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem;
          color: #1a1206;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid #ede7dc;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: #faf7f2;
        }

        .db-section-title svg {
          color: #c8873a;
          flex-shrink: 0;
        }

        /* ── Table wrapper: horizontal scroll on small screens ── */
        .db-table-wrap {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.9rem;
          min-width: 520px;
        }

        thead {
          background: #1a1206;
          color: #f5f0e8;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-size: 0.72rem;
        }

        thead th {
          padding: 0.85rem 1.2rem;
          font-weight: 600;
          white-space: nowrap;
        }

        tbody tr {
          border-bottom: 1px solid #ede7dc;
          transition: background 0.15s;
        }

        tbody tr:last-child { border-bottom: none; }

        tbody tr:hover { background: #faf7f2; }

        td, tbody th {
          padding: 0.85rem 1.2rem;
          color: #3b3020;
          vertical-align: top;
        }

        tbody th {
          font-weight: 600;
          color: #c8873a;
          width: 50px;
        }

        /* Biography cell: clamp long text */
        .bio-cell {
          max-width: 300px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }

        /* ── Responsive: stack on very small screens ── */
        @media (max-width: 480px) {
          .db-root { padding: 1rem 0.75rem 3rem; }
          td, tbody th, thead th { padding: 0.7rem 0.9rem; }
        }
      `}</style>

      <div className="db-root">
        <div className="db-header">
          <h1>Library Catalog</h1>
          <p>{books.length > 0 ? `${books.length} entries loaded` : "Loading catalog…"}</p>
          <div className="db-divider" />
        </div>

        {loading ? (
          <div className="db-loading">
            <div className="db-spinner" />
            <span>Fetching records…</span>
          </div>
        ) : (
          <>
            {/* ── Books Table ── */}
            <div className="db-section">
              <div className="db-section-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
                Books Details
              </div>
              <div className="db-table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Author</th>
                      <th>ISBN</th>
                      <th>Pub Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((element, index) => (
                      <tr key={index}>
                        <th scope="row">{element.id}</th>
                        <td>{element.book?.title}</td>
                        <td>{element.book?.author}</td>
                        <td>{element.book?.isbn}</td>
                        <td>{element.book?.pubdate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── Authors Table ── */}
            <div className="db-section">
              <div className="db-section-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                Author Details
              </div>
              <div className="db-table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Date of Birth</th>
                      <th>Biography</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((element, index) => (
                      <tr key={index}>
                        <th scope="row">{element.id}</th>
                        <td>{element.author?.name}</td>
                        <td>{element.author?.dob}</td>
                        <td><div className="bio-cell">{element.author?.biography}</div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;