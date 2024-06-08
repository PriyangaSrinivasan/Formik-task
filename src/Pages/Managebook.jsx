import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Managebook = () => {
  //hooks 
    const [books, setBooks] = useState([]);
  const [deleteBook,setDeleteBook] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, [deleteBook]);
//fetchdata
  const fetchData = async () => {
    await axios.get("https://6659bac3de346625136db076.mockapi.io/api/book/")
      .then((res) => setBooks(res.data))
      .catch((error) => console.log(error));
  };
  //edit
  const handleEdit = (id) => {
    navigate(`/updatebook/${id}`);
  };
  //delete
  const handleDelete = async (id) => {
    await axios.delete(`https://6659bac3de346625136db076.mockapi.io/api/book/${id}`)
      .then((res) => setDeleteBook(res.data))
      .catch((error) => console.log(error));
      
  };
    return (
      // creating a table to store the book details
        <div>
        <table className="table table-danger">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">ISBN</th>
              <th scope="col">Pubdate</th>
              <th scope="col">Name</th>
              <th scope="col">DOB</th>
              <th scope="col">Biography</th>
              <th scope="col" colSpan={2}>
                Action
              </th>
            </tr>
          </thead>
          <tbody className=" table table-primary">
            {books.map((ele, index) => {
              return (
                <tr key={index}>
                  <td>{ele.id}</td>
                  <td>{ele.book.title}</td>
                  <td>{ele.book.author}</td>
                  <td>{ele.book.isbn}</td>
                  <td>{ele.book.pubdate}</td>
                  <td>{ele.author.name}</td>
                 <td>{ele.author.dob}</td>
                  <td>{ele.author.biography}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        handleEdit(ele.id);
                      }}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        handleDelete(ele.id);
                      }}
                    >
                      Delete
                    </button> 
                    </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
};

export default Managebook;