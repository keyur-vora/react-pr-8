import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './add.css'

const Add = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [gender, setGender] = useState("")
  const [date, setDate] = useState("")
  const [status, setStatus] = useState("")
  const [record, setRecord] = useState(JSON.parse(localStorage.getItem("users")) || [])
  const [course, setCourse] = useState([])



  const handleCourseChange = (checked, c) => {
    let all = [...course];
    if (checked) {
      all.push(c);
    } else {
      all = all.filter(val => val != c)
    }
    setCourse(all)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = {
      userid: Math.floor(Math.random() * 10000),
      name: name,
      email: email,
      password: password,
      gender: gender,
      course: course,
      date: date,
      status: status,
    }



    let newfield = [...record, obj];
    setRecord(newfield);
    localStorage.setItem("users", JSON.stringify(newfield));
    alert("successfully add...");

  }




  return (
    <div>
      <h2>Add User</h2>

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


            <button className='sumb'>Submit</button>

          </form>
          <Link to={`/`} className='link'>view</Link>
        </div>

      </div >

    </div >
  );
}

export default Add