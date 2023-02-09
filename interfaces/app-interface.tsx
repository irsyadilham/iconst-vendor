import { Action as LoadingAction } from '../reducers/loading-reducer';

interface LoadingDispatch {
  (args: LoadingAction): void;
}

interface Loading {
  state: boolean;
  dispatch: LoadingDispatch;
}

export default interface App {
  loading: Loading;
}