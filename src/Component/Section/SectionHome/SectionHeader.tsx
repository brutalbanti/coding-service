import './header.css';
import notebook from '../../../source/header/notebook.png';
import { ImExit } from 'react-icons/im';
import { signOut } from 'firebase/auth';
import { auth } from '../../../config/firebaseConfig';

export const SectionHeader = () => {
    const signOutAuth = () =>{
        signOut(auth)
    }
    return (
        <section className="page__header">
            <div className="header__container">
                <div className="header__notebook">
                    <img src={notebook} alt="icon-notebook" className='header__notebook-img' />
                    <p className='header__text'>PROGRAMMING</p>
                    <p style={{ textAlign: "center", marginTop: '2px' }}>
                        <ImExit size="2em" fill='white' onClick={signOutAuth} />
                    </p>
                </div>
            </div>
        </section>
    )
}