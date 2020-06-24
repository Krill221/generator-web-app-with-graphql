import { useContext } from 'react';
import { AuthContext } from '../auth';

export const AuthArea = ({publicArea, privateArea}) => {
    const { user } = useContext(AuthContext);
    return user ? privateArea : publicArea 
}