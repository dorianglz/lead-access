import './style/App.css';
import Lead from './component/lead';
import Header from './component/header';
import axios from './api/axios';
import { useEffect, useState } from 'react';

function MainPage() {

  const [ input, setInput ] = useState("")
  const [ leads, setLeads ] = useState([])
  const [ display, setDisplay ] = useState([])

  useEffect(() => {
    axios.get("http://127.0.0.1:8080/leads")
      .then((res) => {
        setLeads(res.data)
      })
  })
  
  const filterEmail = () => {
    return leads.filter(l => l.email.includes(input));
  }

  const filterFirstname = () => {
    return leads.filter(l => l.firstname.includes(input));
  }

  const filterPhone = () => {
    return leads.filter(l => l.phone_number_concatenated.includes(input));
  }

  const updateFilter = (e) => {
    //console.log("target", e.target.value)
    setInput(e.target.value);
    if (e.target.value.length > 0) {
      const emailFilter = filterEmail();
      const firstnameFilter = filterFirstname();
      const phoneFilter = filterPhone();
      
      //console.log("email :", emailFilter.length, "fisrtanme :", firstnameFilter.length)
      
      const result = [...new Set([...emailFilter, ...firstnameFilter, ...phoneFilter])]
      setDisplay(result)
      //console.log("display :", display.length)
    } else {
      setDisplay(leads)
    }
  }

  return (
    <div className="App">
      <Header />
      <div className='body'>
        <div className='stat'>
          <h1 style={{color: "#24398A"}}>{display.length === 0 ? leads.length : display.length}</h1>
          <h1>{leads.length > 1 ? "leads" : "lead"}</h1>
        </div>
        <div className='filter'>
          <div className='filter-names'>
            <h2 className='filter-tilte'>Rechercher</h2>
            <input className='filter-input' type='text' name='search' id='search' placeholder='Nom, prénom, téléphone, email...'
            onChange={(e) => updateFilter(e)}/>
          </div>
        </div>
        <div className='leads'>
          {/* {leads && leads.map((lead) => {
            return <Lead lead={lead}/>;
          })} */}
          {display.length === 0 ? leads.map((lead, i) => {
            return <Lead key={i} lead={lead}/>;
          }) 
          : display.map((lead, i) => {
            return <Lead key={i} lead={lead}/>;
          })}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
