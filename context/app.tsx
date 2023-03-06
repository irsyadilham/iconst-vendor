import { createContext } from 'react';
import type { App } from '../types/app';

const AppContext = createContext<App | null>(null);

export default AppContext;