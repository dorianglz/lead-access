import { useState } from 'react';
import { updateLead } from '../api/axios';
import '../style/Lead.css';

import saveIcon from '../images/save.svg'

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
                </div>}
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
        commentaire
    } = props.lead;
    
    const [ focusCom, setFocusCom ] = useState(false)
    const [ newValue, setNewValue ] = useState(commentaire)

    const updateCommentaire = () => {
        const json = JSON.stringify({ champ: 'commentaire', value: newValue })

        updateLead(id, json);
        setFocusCom(false)
    }

    return (
        <div className="lead">
            <h2 className="names">{firstname + " " + lastname}</h2>
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
                    {!focusCom && <p className='info-commentaire' onClick={() => setFocusCom(true)}>{commentaire}</p> }
                    { focusCom && <input id="com-value" type='text' defaultValue={commentaire} onChange={(e) => setNewValue(e.target.value)}/> }
                    { focusCom && <img id="saveIconCom" src={saveIcon} alt="Save Com Icon" onClick={updateCommentaire}/> }
                </div>
            </div>
            <div className='footer'>
                <div className='footer-agent'>
                    <p className='footer-label'>Agent : </p>
                    <p className='footer-value'>Dorian Gonzalez</p>
                </div>
            </div>
        </div>
    );
}

export default Lead;