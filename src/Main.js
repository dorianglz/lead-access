import AuthContext from './context/AuthProvider';
import Lead from './component/lead';
import Header from './component/header';
import { getManagerLeads, getUserLeads, getManagerLeadsCount, getUserLeadsCount } from './api/axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { LeadStatus, UserType } from './context/enums';
import Toggle from 'react-toggle'

import './style/App.css';

import leftArrow from './images/left-arrow.svg'
import rightArrow from './images/right-arrow.svg'
import { useIntersection } from '@mantine/hooks';

function MainPage() {

  const { auth } = useContext(AuthContext)

  const [ input, setInput ] = useState("")
  const [ statut, setStatut ] = useState("")
  const [ pagelaod, setPageload ] = useState(false)
  const [ unique, setUnique ] = useState(false)
  const [ index, setIndex ] = useState(0)
  const [ totalCount, setTotalCount ] = useState("")
  const [ leads, setLeads ] = useState([])

  const [ itemParPage ] = useState(10);
  const [ currentPage, setCurrentPage ] = useState(0);

  const lastPostRef = useRef(null)
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1
  })

  const fetchNextPage = () => {
    getManagerLeads(auth.id, input, itemParPage, (currentPage + 1) * itemParPage).then((res) => setLeads([...leads, ...res.data]))
    setCurrentPage(currentPage + 1)
  }

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage()
    // eslint-disable-next-line
  }, [entry])
 
  const setup = () => {
    if (!pagelaod) {
      if (auth.user_type === UserType.MANAGER) {
        getManagerLeads(auth.id, input, itemParPage, currentPage * itemParPage).then((res) => setLeads(res.data))
        getManagerLeadsCount(auth.id).then((res) => setTotalCount(res.data))
      } else {
        getUserLeads(auth.id).then((res) => setLeads(res.data))      
        getUserLeadsCount(auth.id).then((res) => setTotalCount(res.data))      
      }
      setPageload(true)
    }
  }
  
  const handleChange = (e) => {
    if (e.target.value) {
      setCurrentPage(0)
      setLeads([])
      setInput(e.target.value)
      getManagerLeads(auth.id, input, itemParPage, currentPage * itemParPage).then((res) => setLeads(res.data))
    }
  }

  setup();
  
  return (
    <div className="App">
      <Header />
      <div className='body'>
        <div className='stat-title'>
          <h1 style={{color: "#24398A"}}>{totalCount}</h1>
          <h1>{' leads'}</h1>
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
        <div className='filter-card'>
          <Toggle
            id='cheese-status'
            defaultChecked={unique}
            onChange={() => setUnique(!unique)} />
            <p className='label-check'>One by one view</p>
        </div>
        { unique && leads[index] && 
        <>
          <div className='controls'>
            {index !== 0 ? <img className='ctrl-icon' src={leftArrow} alt='left arrow' onClick={() => setIndex(index - 1)}/> : <div></div>}
            {index !== leads.length ? <img className='ctrl-icon' src={rightArrow} alt='right arrow' onClick={() => setIndex(index + 1)}/> : <div></div>}
          </div>
          <Lead lead={leads[index]}/>
        </> }
        { !unique && <div className='leads'>
          { 
            leads?.map((lead) => {
              console.log(lead)
              return <Lead key={lead.id} lead={lead}/>
            })
          }
            </div>
        }
        <div ref={ref}></div>
      </div>
    </div>
  );
}

export default MainPage;


  // useEffect(() => {
  //   const result = leads.filter((lead) => {
  //     const l = makeString(lead).toLocaleLowerCase()
  //     const i = input.toLocaleLowerCase()

  //     return l.includes(i)
  //   })
  //   setDisplay(result);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [input])

  // const formatNumer = (num) => {
  //   if (num[0] !== '0' && num.length < 10) {
  //     return '0' + num;
  //   } else {
  //     return num;
  //   }
  // }

  // const makeString = (lead) => {
  //   return (lead.email
  //   + " " + lead.firstname
  //   + " " + lead.lastname
  //   + " " + formatNumer(lead.phone_number_concatenated)
  //   + " " + lead.departement
  //   + " " + lead.year_of_birth
  //   + " " + lead.zipcode);
  // }
