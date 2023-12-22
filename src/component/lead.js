import { useEffect, useState } from 'react';
import { getUser, updateLead } from '../api/axios';
import { LeadStatus } from '../context/enums';

import saveIcon from '../images/save.svg'
import '../style/Lead.css';

function InfoCol(props) {
    
    const { id, label, value, champ } = props;
    const [ focus, setFocus ] = useState(false)
    const [ newValue, setNewValue ] = useState(value)

    const updateChamp = () => {
        const json = JSON.stringify({ champ: champ, value: newValue })
        updateLead(id, json);
        setFocus(false)
    }

    return (
        <div className='infoCol'>
            <p className='info-label'>{label}</p>
            {!focus && <p onClick={ () => setFocus(true) } className='info-value'>{value}</p>}
            { focus &&
                <div className='update-col'>
                    <input id="update-value" type='text' defaultValue={value} onChange={(e) => setNewValue(e.target.value)}/>
                    <img id="saveIcon" src={saveIcon} alt="Save Icon" onClick={updateChamp}/>
                </div> }
        </div>
    );
}

function Lead(props) {

    const {
        id,
        firstname,
        lastname,
        email,
        phone_number_concatenated,
        zipcode,
        year_of_birth,
        housing_status,
        commentaire,
        statut,
        assigned_to
    } = props.lead;
    
    const [ focusCom, setFocusCom ] = useState(false)
    const [ newValue, setNewValue ] = useState(commentaire)
    const [ agent, setAgent ] = useState(null)
    const [ nom, setNom ] = useState(lastname)
    const [ prenom, setPrenom ] = useState(firstname)
    const [ focusName, setFocusName ] = useState(false)

    useEffect(() => {
        if (assigned_to) {
            getUser(assigned_to).then((res) => {
                setAgent(res.data.firstname + " " + res.data.lastname)
            })
        }
    }, [assigned_to])

    const updateCommentaire = () => {
        const json = JSON.stringify({ champ: 'commentaire', value: newValue })
        updateLead(id, json);
        setFocusCom(false)
    }

    const updateStatut = (e) => {
        const json = JSON.stringify({ champ: 'statut', value: e.target.value })
        updateLead(id, json);
    }

    const updateNom = () => {
        const json = JSON.stringify({ champ: 'lastname', value: nom })
        updateLead(id, json);
    }

    const updatePrenom = () => {
        const json = JSON.stringify({ champ: 'firstname', value: prenom })
        updateLead(id, json);
    }

    return (
        <div className="lead">
            {!focusName && <h2 className="names" onClick={() => setFocusName(true)}>{firstname + " " + lastname}</h2> }
            { focusName && <div className='input-names'>
                <input id='input-name' type='text' value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                <input id='input-name' type='text' value={nom} onChange={(e) => setNom(e.target.value)} />
                <img id="input-name-save" src={saveIcon} alt="Save Name Icon"
                onClick={() => {
                    updateNom()
                    updatePrenom()
                    setFocusName(false)
                }}/>
            </div>}
            <div className="row-1">
                <InfoCol label="Email" id={id} champ="email" value={email} />
                <InfoCol label="Téléphone" id={id} champ="phone_number_concatenated" value={phone_number_concatenated.length < 10 ? "0" + phone_number_concatenated : phone_number_concatenated} />
                <InfoCol label="Propriétaire" id={id} champ="housing_status" value={housing_status} />
            </div>
            <div className="row-1">
                <InfoCol label="Imposition" id={id} champ="" value={"EMPTY"} />
                <InfoCol label="Année de naissance" id={id} champ="year_of_birth" value={year_of_birth} />
                <InfoCol label="Code postal" id={id} champ="zipcode" value={zipcode} />
            </div>
            <div className="row-1">
                <InfoCol label="Profession" id={id} champ="" value={"EMPTY"} />
                <InfoCol label="Situation familiale" id={id} champ="" value={"EMPTY"} />
                <InfoCol label="Status juridique" id={id} champ="" value={"EMPTY"} />
            </div>
            <div className="row-1">
                <InfoCol label="Addresse" id={id} champ="" value={"EMPTY"} />
                <InfoCol label="Enfant ?" id={id} champ="" value={"EMPTY"} />
            </div>
            <div className="commentaire">
                <p className='info-label'>Commentaire</p>
                <div className='com-col'>
                    {!focusCom && <p className='info-commentaire' onClick={() => setFocusCom(true)}>{commentaire ? commentaire : "Cliquez pour écrire un commentaire"}</p> }
                    { focusCom && <textarea id="com-value" type='text' defaultValue={commentaire} onChange={(e) => setNewValue(e.target.value)}/> }
                    { focusCom && <img id="saveIconCom" src={saveIcon} alt="Save Com Icon" onClick={updateCommentaire}/> }
                </div>
            </div>
            <div className='footer'>
                <div className='footer-agent'>
                    {agent && <p className='footer-label'>Agent : </p>}
                    {agent && <p className='footer-value'>{agent}</p>}
                </div>
                <div className='footer-status'>
                    <p className='footer-label'>Statut : </p>
                    <select id="dropdown-statut" defaultValue={statut ? statut : 'DEFAULT'}
                    onChange={(value) => updateStatut(value)}>
                        <option value="DEFAULT" disabled>Choisir un statut</option>
                        {Object.values(LeadStatus).map((l, i) => {
                                return <option key={i} value={l}>{l}</option>
                            })
                        }
                    </select>
                </div>
            </div>
        </div>
    );
}

export default Lead;