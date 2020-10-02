import { createAction, createReducer, createSelector, on, union } from '@ngrx/store';
import { ActivityLog, BrowseTarget, Neo4jAuth, SearchResult } from '../models/core';

export const storeName = 'core';
export const initialState = {
  command: '',
  searchResults: null as SearchResult[] | null,
  browseTarget: null as BrowseTarget | null,
  loginFormValue: null as Neo4jAuth | null,
  loginRequest: null as number | null,
  activityLogs: [] as ActivityLog[],
};
export type State = Readonly<typeof initialState>;
export type AppState = { [storeName]: State };

export const submitCommand = createAction('[Command] submit', (command: string) => ({ data: command }));
export const resetSearchResults = createAction('[Search] update results', (results: SearchResult[]) => ({ data: results }));
export const browseSearchResult = createAction('[Search] browse a search result', (value: BrowseTarget) => ({ data: value }));
export const submitLoginForm = createAction('[Neo4j] submit neo4j login form', (value: Neo4jAuth) => ({ data: value }));
export const requestNeo4jLogin = createAction('[Neo4j] request neo4j login', (requestedAt: number) => ({ data: requestedAt }));
export const addActivityLog = createAction('[Activity] add', (act: ActivityLog) => ({ data: act }));
const actions = union({ submitCommand });
export type ActionsUnion = typeof actions;

const innerReducer = createReducer(
  initialState,
  on(submitCommand, (state, action) => ({
    ...state,
    command: action.data,
  })),
  on(resetSearchResults, (state, action) => ({
    ...state,
    searchResults: action.data,
  })),
  on(browseSearchResult, (state, action) => ({
    ...state,
    browseTarget: action.data,
  })),
  on(submitLoginForm, (state, action) => ({
    ...state,
    loginFormValue: action.data,
  })),
  on(requestNeo4jLogin, (state, action) => ({
    ...state,
    loginRequest: action.data,
  })),
  on(addActivityLog, (state, action) => ({
    ...state,
    activityLogs: [...state.activityLogs, action.data],
  })),
);
export const reducer = (state: State, action: ActionsUnion) => innerReducer(state, action);

export const selectFeatureStore = (state: AppState) => state.core;
export const selectCommand = createSelector(selectFeatureStore, (state: State) => state.command);
export const selectSearchResults = createSelector(selectFeatureStore, (state: State) => state.searchResults);
export const selectBrowseTarget = createSelector(selectFeatureStore, (state: State) => state.browseTarget);
export const selectLoginFormValue = createSelector(selectFeatureStore, (state: State) => state.loginFormValue);
export const selectLoginRequest = createSelector(selectFeatureStore, (state: State) => state.loginRequest);
export const selectActivityLogs = createSelector(selectFeatureStore, (state: State) => state.activityLogs);
