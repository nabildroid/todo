import * as React from "react";
import { Item, ENDPOINT, EndpointAdd, EndpointUpdate } from "./main";
import Note from "./components/note";

export enum useFetchActions {
  LOADING,
  SUCCESS,
  FAIL,
}

type PayloadType = { response: any } | { error: Error } | undefined;
type ReducerAction = {
  type: useFetchActions;
  payload?: PayloadType;
};

type ReducerState = {
  response: any;
  loading: boolean;
  error: Error;
};

function isPayloadForLoading(
  payload: PayloadType,
  type: useFetchActions
): payload is undefined {
  return type == useFetchActions.LOADING;
}
function isPayloadForSuccess(
  payload: PayloadType,
  type: useFetchActions
): payload is { response: any } {
  return type == useFetchActions.SUCCESS;
}
function isPayloadForError(
  payload: PayloadType,
  type: useFetchActions
): payload is { error: Error } {
  return type == useFetchActions.FAIL;
}

const reducer = (state: ReducerState, action: ReducerAction): ReducerState => {
  const { type, payload } = action;
  if (isPayloadForLoading(payload, type)) {
    return {
      response: [],
      loading: true,
      error: null,
    };
  } else if (isPayloadForSuccess(payload, type)) {
    return {
      response: payload.response,
      loading: false,
      error: null,
    };
  } else if (isPayloadForError(payload, type)) {
    return {
      response: [],
      loading: false,
      error: payload.error,
    };
  } else return state;
};

type useFetchType = <T>(url: string, initResponce: T) => [T, boolean, Error];

export const useFetch: useFetchType = <T>(url, initResponce: T) => {
  const initState = {
    response: initResponce,
    loading: true,
    error: null,
  };

  const [state, dispatch] = React.useReducer(reducer, initState);

  React.useEffect(() => {
    dispatch({ type: useFetchActions.LOADING });
    fetch(url)
      .then((d) => d.json())
      .then((d) =>
        dispatch({ type: useFetchActions.SUCCESS, payload: { response: d } })
      )
      .catch((e) =>
        dispatch({ type: useFetchActions.FAIL, payload: { error: e } })
      );
  }, []);

  return [state.response as T, state.loading, state.error];
};

export const useSyncNote = (note: Item) => {
  if (note.fetched) {
    console.log(note.title + "=>==>===> fetched from server");
    return {
      loading: false,
      error: null,
    };
  }
  const firstRenderDone = React.useRef<boolean>();

  const fetchigType = firstRenderDone.current ? ENDPOINT.UPDATE : ENDPOINT.ADD;
  const requestData = firstRenderDone.current
    ? {
        created: note.history[0].time,
        done: note.done,
      }
    : {
      title:note.title,
      content:note.content
    }
  
  const [_, loading, error] = useFetch<typeof requestData>(fetchigType,requestData);

  console.log(fetchigType);
  React.useEffect(() => {
    firstRenderDone.current = true;
  }, []);
  return { loading, error };
};
