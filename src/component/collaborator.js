import React, { useEffect, useState } from "react";

import "../style/Collaborators.css"
import addIcon from '../images/add_icon.svg'
import rmIcon from '../images/rm_icon.svg'
import { addLeads, getLeadsDepartementCount, getUserLeadsCount } from "../api/axios";
import { Region } from "../context/enums";

export default function Collaborator(props) {
    
    const { user } = props;

    const [leads, setLeads] = useState(0)
    const [nbleads, setNBLeads] = useState(100)
    const [region, setRegion] = useState()
    const [regionCount, setRegionCount] = useState(0)
    
    useEffect(() => {
        getUserLeadsCount(user.id).then((res) => { 
            if (res) setLeads(res.data)
        })
    }, [user.id])

    useEffect(() => {
        if (region) {
            const json = JSON.stringify({ region: region.split(',') })
            
            getLeadsDepartementCount(json).then((res) => { if (res) setRegionCount(res.data) })
        }
    }, [region])

    const addLeadsToCollaborator = () => {
        const json = JSON.stringify({ region: region.split(','), len: nbleads })
        
        addLeads(user.id, json).then((res) => {
            if (res) {
                window.location.reload();
            }
        })
    }

    return (
        <div className="collaborator">
            <div className="first-row">
                <p className="col-name">{user.firstname + " " + user.lastname}</p>
                <p className="number-of-leads">{leads} leads</p>
            </div>
            <div className="second-row">
                <div className="col-email">
                    <p className="email-label">Email</p>
                    <p className="email-value">{user.email}</p>
                </div>
                <div className="col-add-leads">
                    <div className="add-leads">
                        {region && <p className="number-selected-leads">{regionCount} leads dispo</p>}
                        <select id="dropdown-region" defaultValue={'DEFAULT'} onChange={(e) => setRegion(e.target.value)}>
                            <option value="DEFAULT" disabled>Choisir une région</option>
                            {Object.values(Region).map((r, i) => {
                                return <option key={i} value={r.CodePostal}>{r.display}</option>
                            })}
                        </select>
                    </div>
                    <div className="buttons">
                        {nbleads > 0 && <img id="icons" src={rmIcon} alt="rm Icon" onClick={() => setNBLeads(nbleads - 50)}/>}
                        <input id="add-leads-btn" disabled={!region} onClick={() => addLeadsToCollaborator()} type="button" value={"Ajouter " + nbleads + " leads"}/>
                        <img id="icons" src={addIcon} alt="Add leads Icon" onClick={() => setNBLeads(nbleads + 50)}/>
                    </div>
                </div>
            </div>
            {/* <div className="action-btns">
                <input className="actions" type="button" value={"Reset password"}/>
                <input className="actions" type="button" value={"Supprimer"}/>
            </div> */}
        </div>
    );
}
