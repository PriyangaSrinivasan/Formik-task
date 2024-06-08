import axios from "axios";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [books, setbooks] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    await axios
      .get("https://6659bac3de346625136db076.mockapi.io/api/book/")
      .then((res) => setbooks(res.data))
      .catch((error) => console.log(error));
  };
  return (
    //table to create to read the book details
<div className="container col-md col-sm">
    <div className="book-table " >
        <h3 className="text-info text-center">Books Details:</h3>
        <table className="table table-primary">
          <thead className="table table-danger">
            <tr>
              <th scope="col">Num</th>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">ISBN</th>
              <th scope="col">Pubdate</th>
             
            </tr>
          </thead>
          <tbody>
            {books.map((element, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{element.id}</th>
                  <td>{element.book.title}</td>
                  <td>{element.book.author}</td>
                  <td>{element.book.isbn}</td>
                  <td>{element.book.pubdate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <h3 className="text-info text-center">Author Details:</h3>
        <table className="table table-primary">
          <thead className="table table-danger">
            <tr>
                <th scope="col">Num</th>
              <th scope="col">Name</th>
              <th scope="col">DOB</th>
              <th scope="col">Biography</th>
             
            </tr>
          </thead>
          <tbody>
            {books.map((element,index) => {
              return (
                <tr key={index}>
                  <th scope="row">{element.id}</th>
                  <td>{element.author.name}</td>
                  <td>{element.author.dob}</td>
                  <td>{element.author.biography}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
    </div>
    </div>
  );
};

export default Dashboard;
