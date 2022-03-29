import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth'

import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiFile } from 'react-icons/fi'

export default function Customers() {

    const { signOut, user } = useContext(AuthContext)

    return(
        <div>
            <Header />
            <div className="content">
                <Title name="Clientes" >
                    <FiFile />
                </Title>
            </div>
        </div>

        
    )
}