import React, { useContext, useEffect, useState } from "react";

import "./style/Collaborators.css"
import addIcon from './images/add_icon.svg'
import rmIcon from './images/rm_icon.svg'
import Header from "./component/header";
import { createCollaborator, getCollaborators, getManagerLeads, getNRPCount, getUser } from "./api/axios";
import AuthContext from "./context/AuthProvider";
import { UserType } from "./context/enums";

function Stat(props) {
    const { label, value } = props;

    return (
        <div className="stat">
            <p className="stat-label">{label}</p>
            <p className="stat-value">{value}</p>
        </div>);
}

function Input(props) {
    const { label, onChange } = props;

    return (
        <div className="input">
            <p className="input-label">{label}</p>
            <input className="input-value" placeholder={label} onChange={onChange} />
        </div>);
}

function Collaborator(props) {
    
    const { user } = props;

    return (
        <div className="collaborator">
            <div className="first-row">
                <p className="col-name">{user.firstname + " " + user.lastname}</p>
                <p className="number-of-leads">300 leads</p>
            </div>
            <div className="second-row">
                <div className="col-email">
                    <p className="email-label">Email</p>
                    <p className="email-value">{user.email}</p>
                </div>
                <div className="col-add-leads">
                    <div className="add-leads">
                        <select id="dropdown-region" defaultValue={'DEFAULT'}>
                            <option value="DEFAULT" disabled>Choisir une région</option>
                            <option value="valeur1">Ile-de-France / Hauts-de-France</option>
                            <option value="valeur2">Provence-Alpes-Côte d’Azur</option>
                            <option value="valeur3">Auvergne-Rhône-Alpes</option>
                        </select>
                        <p className="number-selected-leads">10 leads</p>
                    </div>
                    <div className="buttons">
                        <img id="icons" src={rmIcon} alt="rm Icon" />
                        <input id="add-leads-btn" type="button" value={"Ajouter 50 leads"}/>
                        <img id="icons" src={addIcon} alt="Add leads Icon" />
                    </div>
                </div>
            </div>
            <div className="action-btns">
                <input className="actions" type="button" value={"Reset password"}/>
                {/* <input className="actions" type="button" value={"Supprimer"}/> */}
            </div>
        </div>
    );
}

export default function Collaborators() {

    const { auth } = useContext(AuthContext)
    
    const [ leads, setLeads ] = useState([])
    const [ collaborators, setCollaborators ] = useState([])
    const [ email, setEmail ] = useState("")
    const [ firstname, setFirstname ] = useState("")
    const [ lastname, setLastname ] = useState("")
    
    const [ manager, setManager ] = useState("")
    
    const [ nrpCount, setNrpCount ] = useState(0)

    const isManager = auth.user_type === UserType.MANAGER;

    useEffect(() => {
        if (auth.user_type === UserType.MANAGER) {
            getCollaborators(auth.id).then((res) => { setCollaborators(res.data) })
            getManagerLeads(auth.id).then((res) => { setLeads(res.data) })
            getNRPCount().then((res) => { setNrpCount(res.data) })
        } else if (auth.user_type === UserType.USER) {
            getUser(auth.manager_id).then((res) => { setManager(res.data) })
        }
    })

    const addCollaborateur = () => {
        
        if (email !== "" && firstname !== "" && lastname !== "") {
            const json = JSON.stringify({
                email: email,
                password: "123123123",
                firstname: firstname,
                lastname: lastname,
                user_type: UserType.USER,
                manager_id: 1
            });

            createCollaborator(json)
            
            setEmail("")
            setLastname("")
            setFirstname("")
        }
    }

    return (
        <div className="collaborators">
            <Header />
            <div className="body">
                <h1 className="title">{isManager ? "Collaborateurs" : "Manager"}</h1>
                {!isManager && <div className="container-manager">
                    <p className="title-manager">{manager.firstname + " " + manager.lastname }</p>
                </div>}
                {isManager && <div className="leads-stat">
                    <Stat label={"Total leads"} value={leads.length} />
                    <Stat label={"Leads non assigné"} value={leads.filter((l) => { return !l.assigned_to; }).length} />
                </div>}
                {isManager && <div className="leads-stat">
                    <Input onChange={(e) => setEmail(e.target.value)} label={"Email"}/>
                    <Input onChange={(e) => setLastname(e.target.value)} label={"Nom"}/>
                    <Input onChange={(e) => setFirstname(e.target.value)} label={"Prénom"}/>
                    <img id="addIcon" src={addIcon} alt="Add Icon" onClick={addCollaborateur}/>
                </div>}
                {isManager && <div className="nrp-col">
                    <p className="nrps">{nrpCount + " NRP"}</p>
                    <input className="actions" type="button" value={"Récupérer tous les NRP"}/>
                </div>}
                {isManager && <div className="collaborators-list">
                    {collaborators.map((c) => {
                        return (<Collaborator key={c.id} user={c} />);
                    })}
                </div>}
            </div>
        </div>
    );
}