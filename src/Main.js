import AuthContext from './context/AuthProvider';
import Lead from './component/lead';
import Header from './component/header';
import { getManagerLeads, getUserLeads } from './api/axios';
import { useContext, useEffect, useState } from 'react';
import { LeadStatus, UserType } from './context/enums';

import './style/App.css';

function MainPage() {

  const { auth } = useContext(AuthContext)

  const [ input, setInput ] = useState("")
  const [ statut, setStatut ] = useState("")
  const [ pagelaod, setPageload ] = useState(false)
  const [ leads, setLeads ] = useState([])
  const [ display, setDisplay ] = useState([])

  const updateData = (data) => {
    if (!pagelaod) {
      setDisplay(data)
      setPageload(true)
    }
    setLeads(data)
  }

  useEffect(() => {
    if (auth.user_type === UserType.MANAGER) {
      getManagerLeads(auth.id).then((res) => updateData(res.data))
    } else {
      getUserLeads(auth.id).then((res) => updateData(res.data))      
    }
  })

  useEffect(() => {
    const result = leads.filter((lead) => {
      const l = makeString(lead).toLocaleLowerCase()
      const i = input.toLocaleLowerCase()

      return l.includes(i)
    })
    setDisplay(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input])

  const formatNumer = (num) => {
    if (num[0] !== '0' && num.length < 10) {
      return '0' + num;
    } else {
      return num;
    }
  }

  const makeString = (lead) => {
    return (lead.email
    + " " + lead.firstname
    + " " + lead.lastname
    + " " + formatNumer(lead.phone_number_concatenated)
    + " " + lead.departement
    + " " + lead.year_of_birth
    + " " + lead.zipcode);
  }
  
  const handleChange = (e) => {
    setInput(e.target.value)
  }

  return (
    <div className="App">
      <Header />
      <div className='body'>
        <div className='stat-title'>
          <h1 style={{color: "#24398A"}}>{input.length === 0 ? leads.filter((l) => statut !== "" ? l.statut === statut : true).length 
          : display.filter((l) => statut !== "" ? l.statut === statut : true).length}</h1>
          <h1>{leads.length > 1 ? "leads" : "lead"}</h1>
        </div>
        <div className='filter'>
          <div className='filter-names'>
            <h2 className='filter-tilte'>Rechercher</h2>
            <input className='filter-input' type='text' name='search'
            id='search' placeholder='Nom, prénom, téléphone, email...'
            onChange={(e) => handleChange(e)}/>
          </div>
          <div className='filter-names'>
            <h2 className='filter-tilte'>Statut</h2>
            <select id="filter-statut" defaultValue={statut ? statut : ''}
            onChange={(e) => { setStatut(e.target.value) }}>
            <option value="" >Choisir un statut</option>
              {Object.values(LeadStatus).map((l, i) => {
                  return <option key={i} value={l}>{l}</option>
                })
              }
            </select>
          </div>
        </div>
        <div className='leads'>
          { input.length === 0 ?
          leads.filter((l) => statut !== "" ? l.statut === statut : true)
          .map((lead) => { return <Lead key={lead.id} lead={lead}/> }) :
          
          display.filter((l) => statut !== "" ? l.statut === statut : true)
          .map((lead) => { return <Lead key={lead.id} lead={lead}/> })
          }
        </div>
      </div>
    </div>
  );
}

export default MainPage;