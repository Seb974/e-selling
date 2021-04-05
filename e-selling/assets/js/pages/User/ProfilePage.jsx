import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddressPanel from '../../components/userPages/AddressPanel';
import ContactPanel from '../../components/userPages/ContactPanel';
import AuthContext from '../../contexts/AuthContext';
import UserActions from '../../services/UserActions';

const ProfilePage = (props) => {

    const initialInformations =  AddressPanel.getInitialInformations();
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const [informations, setInformations] = useState(initialInformations);
    const [errors, setErrors] = useState({ name: '', email: '', phone: '', address: '', address2: '', zipcode: '', city: '', position: ''});

    useEffect(() => {
        if (currentUser.metas !== null && currentUser.metas !== undefined) {
            let userMetas = {...informations};
            Object.entries(currentUser.metas).forEach(([key, value]) => {
                if (key !== 'position')
                    userMetas = {...userMetas, [key]: (value !== null && value !== undefined) ? value : initialInformations[key]}
                else
                    userMetas = {...userMetas, position: value !== null && value !== undefined && value > 0 ? value : initialInformations.position}
            });
            setInformations(userMetas);
        }
    }, [currentUser.metas]);

    const onInformationsChange = (newInformations) => {
        setInformations(newInformations);
    };

    const onUpdatePosition = (newInformations) => {
        setInformations(informations => { 
            return {...newInformations, address2: informations.address2, phone: informations.phone};
        });
    };

    const onPhoneChange = (phone) => {
        setInformations(informations => { 
            return {...informations, phone}
        });
    };

    const onUserInputChange = (newCurrentUser) => {
        setCurrentUser(newCurrentUser);
    };

    const onSubmit = e => {
        e.preventDefault();
        const { id, metas, roles } = currentUser;
        UserActions.update(id, {...currentUser, metas: {...informations, id: metas.id}, roles: Array.isArray(roles) ? roles : [roles]})
                   .then(response => {
                       setCurrentUser(response.data);
                        setErrors({});
                        //TODO : Flash notification de succès
                   })
                   .catch( ({ response }) => {
                       let apiErrors = [];
                        const { violations } = response.data;
                        if (violations) {
                            violations.forEach(({propertyPath, message}) => {
                                apiErrors[propertyPath] = message;
                            });
                            setErrors(apiErrors);
                        }
                        //TODO : Flash notification d'erreur
                   });
    };

    return (
        <>
            <div className="row"><h2>Mes informations</h2></div>
            <br/>
            <ContactPanel user={ currentUser } phone={ informations.phone } onUserChange={ onUserInputChange } onPhoneChange={ onPhoneChange } errors={ errors }/>
            <hr/>
            <div className="row"><h4>Adresse</h4></div>
                <AddressPanel informations={ informations } onInformationsChange={ onInformationsChange } onPositionChange={ onUpdatePosition } errors={ errors }/>
            <div className="form-group text-center">
                <button className="btn btn-success mb-2" onClick={ onSubmit }>Mettre à jour</button>
            </div>
            <div className="row mb-5">
                <Link to="/" className="btn btn-link">Retour au catalogue</Link>
            </div>
        </>
    );
}
 
export default ProfilePage;