import { useReducer, Reducer, useCallback } from 'react';

enum UseRequestStatus {
  'Idle' = 'Idle', // initial status
  'Fetching' = 'Fetching',
  'FetchSuccess' = 'FetchSuccess',
  'FetchError' = 'FetchError'
}
const initialState: IState<null> = {
  loading: false,
  error: false,
  errorEntity: null,
  data: null,
  status: UseRequestStatus.Idle
};

function useRequest<D = any>(
  url: string,
  options: Omit<RequestInit, 'body'> = { method: 'GET' }
): { requestInfo: IState<D>; makeRequest: (body?: RequestInit['body']) => void } {
  const [state, dispatch] = useReducer(createReducer<D>(), initialState);
  const makeRequest = useCallback(
    async (body: RequestInit['body'] = null): Promise<void> => {
      dispatch({ type: UseRequestStatus.Fetching });
      try {
        let response;
        if (body === null) response = await fetch(url, options);
        else response = await fetch(url, Object.assign(options, { body }));
        if (response.status.toString().startsWith('2')) {
          try {
            const json = await response.json();
            dispatch({ type: UseRequestStatus.FetchSuccess, data: json });
          } catch (e) {
            dispatch({
              type: UseRequestStatus.FetchError,
              errorEntity: new Error('useRequest only works with json response now')
            });
            console.error(e);
          }
        } else {
          console.error(response);
          dispatch({
            type: UseRequestStatus.FetchError,
            errorEntity: new Error(`response code is not 2xx, got ${response.status}`)
          });
        }
      } catch (e) {
        console.error(e);
        dispatch({ type: UseRequestStatus.FetchError, errorEntity: e });
      }
    },
    [options, url]
  );
  return { requestInfo: state, makeRequest };
}

function createReducer<D>(): Reducer<IState<D>, IAction<D>> {
  return function reducer(state: IState<D>, { type, data, errorEntity }: IAction<D>): IState<D> {
    switch (type) {
      case UseRequestStatus.Fetching:
        return {
          loading: true,
          error: false,
          errorEntity: null,
          data: null,
          status: UseRequestStatus.Fetching
        };
      case UseRequestStatus.FetchSuccess:
        return {
          loading: false,
          error: false,
          errorEntity: null,
          data: data,
          status: UseRequestStatus.FetchSuccess
        };
      case UseRequestStatus.FetchError:
        return {
          loading: false,
          error: true,
          errorEntity: errorEntity,
          data: null,
          status: UseRequestStatus.FetchError
        };
      default:
        return state;
    }
  };
}

interface IState<D> {
  loading: boolean;
  error: boolean;
  errorEntity: unknown;
  data: D;
  status: UseRequestStatus;
}
interface IAction<D> {
  type: UseRequestStatus;
  errorEntity?: unknown;
  data?: D;
}

export default useRequest;
export { UseRequestStatus };
