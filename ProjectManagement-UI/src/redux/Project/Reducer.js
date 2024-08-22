import {
  ACCEPT_INVITATION_REQUEST,
  CREATE_PROJECTS_REQUEST,
  CREATE_PROJECTS_SUCCESS,
  DELETE_PROJECTS_REQUEST,
  DELETE_PROJECTS_SUCCESS,
  FETCH_PROJECTS_BY_ID_REQUEST,
  FETCH_PROJECTS_BY_ID_SUCCESS,
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESS,
  INVITE_TO_PROJECT_REQUEST,
  SEARCH_PROJECTS_SUCCESS,
} from "./ActionTypes";

const initialState = {
  projects: [],
  loading: false,
  error: null,
  projectDetails: null,
  searchProjects: [],
};
export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_REQUEST:
    case CREATE_PROJECTS_REQUEST:
    case DELETE_PROJECTS_REQUEST:
    case FETCH_PROJECTS_BY_ID_REQUEST:
    case ACCEPT_INVITATION_REQUEST:
    case INVITE_TO_PROJECT_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        projects: action.projects,
      };

    case SEARCH_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        searchProjects: action.projects,
      };
    case CREATE_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        projects: [...state.projects, action.project],
      };

    case FETCH_PROJECTS_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        projectDetails: action.project,
      };

    case DELETE_PROJECTS_SUCCESS:
      console.log("---------------->", action.projectId);
      return {
        ...state,
        loading: false,
        error: null,
        projects: state.projects.filter(
          (project) => project.id !== action.projectId
        ),
      };

    default:
      return state;
  }
};
