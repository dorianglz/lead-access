import React from "react"
import Header from "./component/header";

import "./style/Register.css"

export default function Register() {
    return (
        <div className="register">
            <Header />
            <div className="login">
                <p>Tu as dejà un compte ?</p>
                <a href="/login">Clique ici</a>
            </div>
            <div className="form">
                <div className="form-block">
                    <p className="label">Prénom</p>
                    <input type="text" id="firstname" name="firstname" placeholder="Prénom"/>
                </div>
                <div className="form-block">
                    <p className="label">Nom</p>
                    <input type="text" id="lastname" name="lastname" placeholder="Nom"/>
                </div>
                <div className="form-block">
                    <p className="label">Email</p>
                    <input type="email" id="email" name="email" placeholder="Email" />
                </div>
                <div className="form-block">
                    <p className="label">Mot de passe</p>
                    <input type="password" id="password" name="password" placeholder="Mot de passe" />
                </div>
                <div className="form-block">
                    <p className="label">Confirmation mot de passe</p>
                    <input type="password" id="password-confirm" name="password-confirm" placeholder="Confirmation mot de passe" />
                </div>
                <input className="submit" type="button" value="Se connecter"/>
            </div>
        </div>
    );
}