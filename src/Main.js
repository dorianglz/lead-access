import './style/App.css';
import Lead from './component/lead';
import Header from './component/header';
import { getManagerLeads, getUserLeads } from './api/axios';
import { useContext, useEffect, useState } from 'react';
import AuthContext from './context/AuthProvider';
import { UserType } from './context/enums';

function MainPage() {

  const { auth } = useContext(AuthContext)

  const [ input, setInput ] = useState("")
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

      //console.log("l : ", l, "i : ", i)

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
          <h1 style={{color: "#24398A"}}>{display.length === 0 ? leads.length : display.length}</h1>
          <h1>{leads.length > 1 ? "leads" : "lead"}</h1>
        </div>
        <div className='filter'>
          <div className='filter-names'>
            <h2 className='filter-tilte'>Rechercher</h2>
            <input className='filter-input' type='text' name='search'
            id='search' placeholder='Nom, prénom, téléphone, email...'
            onChange={(e) => handleChange(e)}/>
          </div>
        </div>
        <div className='leads'>
          {/* {leads && leads.map((lead) => {
            return <Lead lead={lead}/>;
          })} */}
          {input.length === 0 ? leads.map((lead, i) => {
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


/**
 * 
 * SAVE
 * 
 *   const filterEmail = () => {
    return leads.filter(l => l.email.includes(input));
  }

  const filterFirstname = () => {
    return leads.filter(l => l.firstname.includes(input));
  }

  const filterPhone = () => {
    return leads.filter(l => l.phone_number_concatenated.includes(input));
  }

  const updateFilter = () => {
    //console.log("target", e.target.value)


    const emailFilter = filterEmail();
      const firstnameFilter = filterFirstname();
      const phoneFilter = filterPhone();
      
      console.log("input : ", input)

      console.log("email :", emailFilter.length,
       "fisrtanme :", firstnameFilter.length,
       "phone :", phoneFilter.length)
      
      const result = [...new Set([...emailFilter, ...firstnameFilter, ...phoneFilter])]
      setDisplay(result)
      //console.log("display :", display.length)
  }
 */