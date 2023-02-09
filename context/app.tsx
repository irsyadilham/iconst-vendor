import { createContext } from 'react';
import App from '../interfaces/app-interface';

const AppContext = createContext<App>(null);

export default AppContext;