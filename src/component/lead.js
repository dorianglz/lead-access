import '../style/Lead.css';

function InfoCol(props) {
    return (
        <div className='infoCol'>
            <p className='info-label'>{props.label}</p>
            <p className='info-value'>{props.value}</p>
        </div>
    );
}

function Lead() {
  return (
    <div className="lead">
        <h2 className="names">Nom prenom</h2>
        <div className="row-1">
            <InfoCol label="Email" value={"maydorma11@live.fr"} />
            <InfoCol label="Téléphone" value={"0782403961"} />
            <InfoCol label="Propriétaire" value={"Propriétaire"} />
        </div>
        <div className="row-1">
            <InfoCol label="Imposition" value={">2500"} />
            <InfoCol label="Année de naissance" value={"1993"} />
            <InfoCol label="Code postal" value={"92170"} />
        </div>
        <div className="row-1">
            <InfoCol label="Profession" value={"Développeur"} />
            <InfoCol label="Situation familiale" value={"Célibataire"} />
            <InfoCol label="Status juridique" value={"Salarié"} />
        </div>
        <div className="row-1">
            <InfoCol label="Addresse" value={"118 avenue jean jaures"} />
            <InfoCol label="Enfant ?" value={"Oui"} />
        </div>
        <div className="commentaire">
            <p className='info-label'>Commentaire</p>
            <p className='info-commentaire'>Ceci est mon commentaire</p>
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