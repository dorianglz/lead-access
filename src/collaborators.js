import React, { useContext, useEffect, useState } from "react";

import { clearNRP, createCollaborator, getCollaborators, getManagerLeads, getNRPCount, getUser, getUserEmail } from "./api/axios";
import { UserType } from "./context/enums";
import addIcon from './images/add_icon.svg'
import Header from "./component/header";
import AuthContext from "./context/AuthProvider";
import Collaborator from "./component/collaborator";

import "./style/Collaborators.css"

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
            getCollaborators(auth.id).then((res) => { if (res) setCollaborators(res.data) })
            getManagerLeads(auth.id).then((res) => { if (res) setLeads(res.data) })
            getNRPCount().then((res) => { if (res) setNrpCount(res.data) })
        } else if (auth.user_type === UserType.USER) {
            getUser(auth.manager_id).then((res) => { if (res) setManager(res.data) })
        }
    })

    const addCollaborateur = () => {
        getUserEmail(email).then((res) => {
            if (res) {
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
            } else {
                alert("Email non disponible")
            }
        })
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
                    <input className="actions" onClick={() => clearNRP()} type="button" value={"Récupérer tous les NRP"}/>
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