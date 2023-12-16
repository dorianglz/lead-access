import '../style/Lead.css';

function InfoCol(props) {
    return (
        <div className='infoCol'>
            <p className='info-label'>{props.label}</p>
            <p className='info-value'>{props.value}</p>
        </div>
    );
}

function Lead(props) {

    const { 
        firstname,
        lastname,
        email,
        phone_number_concatenated,
        zipcode,
        year_of_birth,
        housing_status } = props.lead;
    
    return (
        <div className="lead">
            <h2 className="names">{firstname + " " + lastname}</h2>
            <div className="row-1">
                <InfoCol label="Email" value={email} />
                <InfoCol label="Téléphone" value={phone_number_concatenated.length < 10 ? "0" + phone_number_concatenated : phone_number_concatenated} />
                <InfoCol label="Propriétaire" value={housing_status} />
            </div>
            <div className="row-1">
                <InfoCol label="Imposition" value={"EMPTY"} />
                <InfoCol label="Année de naissance" value={year_of_birth} />
                <InfoCol label="Code postal" value={zipcode} />
            </div>
            <div className="row-1">
                <InfoCol label="Profession" value={"EMPTY"} />
                <InfoCol label="Situation familiale" value={"EMPTY"} />
                <InfoCol label="Status juridique" value={"EMPTY"} />
            </div>
            <div className="row-1">
                <InfoCol label="Addresse" value={"EMPTY"} />
                <InfoCol label="Enfant ?" value={"EMPTY"} />
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