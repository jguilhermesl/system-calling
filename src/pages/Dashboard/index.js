import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth'

import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiMessageCircle } from 'react-icons/fi'

export default function Dashboard() {

    const { signOut, user } = useContext(AuthContext)

    return(
        <div>
            <Header />
            <div className="content">
                <Title name="Atendimentos" >
                    <FiMessageCircle />
                </Title>
            </div>
        </div>

        
    )
}