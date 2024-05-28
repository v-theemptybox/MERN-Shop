import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const User = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:5000/admin/getUsers?page=${page}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const resData = await response.json();
      if (response.ok) {
        setUsers(resData.results);
        setTotalPages(resData.totalPages);
      } else {
        console.log(resData.message);
      }
    };
    fetchData();
  }, [page]);

  return (
    <>
      <div className="mt-5 border rounded shadow text-start pt-4 px-3">
        <div className="mb-4">
          <h3>Users</h3>
        </div>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">ID User</th>
              <th scope="col">Email</th>
              <th scope="col">Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.email}</td>
                <td>{user.fullName}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-end">
          <span>
            {page} of {totalPages}
          </span>
          <button
            className={`border-0 bg-white px-2 mx-1 mb-2 ${
              page === 1 ? "text-secondary disabled" : ""
            }`}
            onClick={() => {
              if (page !== 1) {
                setPage(page - 1);
              }
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button
            className={`border-0 bg-white px-2 mx-1 mb-2 ${
              page === totalPages ? "text-secondary disabled" : ""
            }`}
            onClick={() => {
              if (page !== totalPages) {
                setPage(page + 1);
              }
            }}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </>
  );
};

export default User;
