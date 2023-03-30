import {getAuth} from 'firebase/auth';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import app from './firebaseConfig'


const auth = getAuth(app);

export {auth};
