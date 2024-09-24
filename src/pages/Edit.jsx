import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './add.css'

const Edit = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [gender, setGender] = useState("")
    const [course, setCourse] = useState([])
    const [date, setDate] = useState("")
    const [status, setStatus] = useState("")
    const [record, setRecord] = useState(JSON.parse(localStorage.getItem("users")) || [])


    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        setName(location?.state?.name)
        setEmail(location?.state?.email);
        setPassword(location?.state?.password);
        setGender(location?.state?.gender);
        setCourse(location?.state?.course);
        setDate(location?.state?.date);
        setStatus(location?.state?.status);

    }, [location?.state])


    const handleSubmit = (e) => {
        e.preventDefault();


        let up = record.map((val) => {
            if (val.userid == location?.state?.userid) {
                val.name = name
                val.email = email
                val.password = password
                val.gender = gender
                val.course = course
                val.date = date
                val.status = status
            }
            return val;
        })
        localStorage.setItem('users', JSON.stringify(up));
        alert("sucessfully record update...");
        navigate('/');


    }




    return (
        <div>
            <h2>Edit User</h2>

            <div className="container">
                <div className="row">
                    <form onSubmit={handleSubmit}>

                        <div className='name'>
                            <label>Name</label>
                            <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
                        </div>

                        <div className='email'>
                            <label >Email</label>
                            <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} />
                        </div>

                        <div className='pass'>
                            <label>Password</label>
                            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                        </div>

                        <div className='gen'>
                            <label>Gender</label>
                            <div>
                                <input type="radio" value="Male" name="gender" onChange={(e) => setGender(e.target.value)} />
                                <label>Male</label>
                                <input type="radio" value="Female" name="gender" onChange={(e) => setGender(e.target.value)} />
                                <label >Femal</label>
                            </div>
                        </div>

                        <div className='cou'>
                            <label>Course</label>
                            <div>
                                {
                                    ["html", "css", "bootstrap", "js", "react js", "node js", "php", "angular", "python", "laravel"].map((c) => {
                                        return (
                                            <label>
                                                <input type="checkbox" onChange={(e) => handleCourseChange(e.target.checked, c)} />{c}
                                            </label>
                                        )
                                    })
                                }
                            </div>

                        </div>

                        <div className='time'>
                            <label>Date</label>
                            <input type="date" onChange={(e) => setDate(e.target.value)} value={date} />
                        </div>

                        <div className='status'>
                            <label>Select status</label>
                            <select onChange={(e) => setStatus(e.target.value)} value={status}>
                                <option value="">----Select status----</option>
                                <option value="active">Active</option>
                                <option value="unactive">Unactive</option>
                            </select>
                        </div>


                        <button className='sumb'>Update</button>
                    </form>
                    <Link to={`/`} className='link'>view</Link>
                </div>

            </div >

        </div >
    );
}

export default Edit