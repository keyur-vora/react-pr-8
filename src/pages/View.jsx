import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './view.css'



const View = () => {

    const [sort, setSort] = useState("");
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [filter, setFilter] = useState([]);

    const navigate = useNavigate();

    const [record, setRecord] = useState(
        JSON.parse(localStorage.getItem("users")) || []
    );

    useEffect(() => {
        let updatedRecords = [...record];

        if (search !== "") {
            updatedRecords = updatedRecords.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (sort === "asc") {
            updatedRecords.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sort === "dsc") {
            updatedRecords.sort((a, b) => b.name.localeCompare(a.name));
        }


        if (status === "active") {
            updatedRecords = updatedRecords.filter((item) => item.status === "active");
        } else if (status === "unactive") {
            updatedRecords = updatedRecords.filter((item) => item.status === "unactive");
        }


        setFilter(updatedRecords);
    }, [sort, search, status, record]);

    const del = (userid) => {
        const updatedRecords = record.filter(user => user.userid !== userid);
        setRecord(updatedRecords);
        localStorage.setItem("users", JSON.stringify(updatedRecords));
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <form className='viewform'>

                        <div className='select'>
                            <select onChange={(e) => setStatus(e.target.value)} value={status}>
                                <option value="">----Select status----</option>
                                <option value="active">Active</option>
                                <option value="unactive">Unactive</option>
                            </select>
                        </div>

                        <div className='serch'>
                            <input
                                type="text"
                                placeholder='Search here'
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                            />
                        </div>

                        <div className='sort'>
                            <select onChange={(e) => setSort(e.target.value)} value={sort}>
                                <option value="">Select Sort</option>
                                <option value="asc">A-Z</option>
                                <option value="dsc">Z-A</option>
                            </select>
                        </div>

                    </form>
                </div>
            </div>

            <table border={1}>
                <thead>
                    <tr>
                        <th>Srno</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Course</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filter.map((val, index) => {
                            const { userid, name, email, gender, course, date, status } = val;
                            return (
                                <tr key={userid}>
                                    <td>{index + 1}</td>
                                    <td>{name}</td>
                                    <td>{email}</td>
                                    <td>{gender}</td>
                                    <td>{course.join(" , ")}</td>
                                    <td>{date}</td>
                                    <td>{status}</td>
                                    <td>
                                        <button onClick={() => del(userid)}>Delete</button>
                                        <button className='edit' onClick={() => navigate(`/edit`, { state: val })}>Edit</button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            <Link to={`/add`} className='link'>Add</Link>
        </>
    );
}

export default View;
