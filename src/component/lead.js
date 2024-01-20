import { useEffect, useState } from 'react';
import { getUser, updateLead } from '../api/axios';
import { LeadStatus } from '../context/enums';

import '../style/Lead.css';

function InfoCol(props) {
    
    const { id, label, value, champ } = props;
    const [ newValue, setNewValue ] = useState(value)

    const updateChamp = () => {
        const json = JSON.stringify({ champ: champ, value: newValue })
        updateLead(id, json);
    }

    return (
        <div className='infoCol'>
            <p className='info-label'>{label}</p>
            <div className='update-col'>
                <input id="update-value" type='text' placeholder={label}
                    defaultValue={value} onBlur={updateChamp}
                    onChange={(e) => setNewValue(e.target.value)}
                />
            </div>
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
        income_tax,
        assigned_to,
        profession,
        family,
        legal_status,
        adresse,
        enfant
    } = props.lead;
    
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

    const handleBlur = () => {
        updateNom()
        updatePrenom()
        setFocusName(false)
    }

    return (
        <div className="lead">
            {!focusName && <h2 className="names" onClick={() => setFocusName(true)}>{prenom + " " + nom}</h2> }
            { focusName && <div className='input-names'>
                <input className='input-name' type='text' value={prenom} onBlur={handleBlur} onChange={(e) => setPrenom(e.target.value)} />
                <input className='input-name' type='text' value={nom} onBlur={handleBlur} onChange={(e) => setNom(e.target.value)} />
            </div>}
            <div className="row-1">
                <InfoCol label="Email" id={id} champ="email" value={email} />
                <InfoCol label="Téléphone" id={id} champ="phone_number_concatenated" value={phone_number_concatenated.length < 10 ? "0" + phone_number_concatenated : phone_number_concatenated} />
                <InfoCol label="Propriétaire" id={id} champ="housing_status" value={housing_status} />
            </div>
            <div className="row-1">
                <InfoCol label="Imposition" id={id} champ="income_tax" value={income_tax} />
                <InfoCol label="Année de naissance" id={id} champ="year_of_birth" value={year_of_birth} />
                <InfoCol label="Code postal" id={id} champ="zipcode" value={zipcode} />
            </div>
            <div className="row-1">
                <InfoCol label="Profession" id={id} champ="profession" value={profession} />
                <InfoCol label="Situation familiale" id={id} champ="family" value={family} />
                <InfoCol label="Status juridique" id={id} champ="legal_status" value={legal_status} />
            </div>
            <div className="row-1">
                <InfoCol label="Addresse" id={id} champ="adresse" value={adresse} />
                <InfoCol label="Enfant ?" id={id} champ="enfant" value={enfant} />
            </div>
            <div className="commentaire">
                <p className='info-label'>Commentaire</p>
                <div className='com-col'>
                    <textarea id="com-value" type='text' defaultValue={newValue} onBlur={updateCommentaire} onChange={(e) => setNewValue(e.target.value)}/>
                </div>
            </div>
            <div className='footer'>
                <div className='footer-agent'>
                    {agent && <p className='footer-label'>Agent: </p>}
                    {agent && <p className='footer-value'>{agent}</p>}
                </div>
                <div className='footer-status'>
                    <p className='footer-label'>Statut: </p>
                    <select className="dropdown-statut" defaultValue={statut ? statut : 'DEFAULT'}
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