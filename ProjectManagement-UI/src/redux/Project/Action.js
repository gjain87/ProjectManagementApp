import api from "@/config/api";
import {
  ACCEPT_INVITATION_REQUEST,
  ACCEPT_INVITATION_SUCCESS,
  CREATE_PROJECTS_REQUEST,
  CREATE_PROJECTS_SUCCESS,
  DELETE_PROJECTS_REQUEST,
  DELETE_PROJECTS_SUCCESS,
  FETCH_PROJECTS_BY_ID_REQUEST,
  FETCH_PROJECTS_BY_ID_SUCCESS,
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESS,
  INVITE_TO_PROJECT_REQUEST,
  INVITE_TO_PROJECT_SUCCESS,
  SEARCH_PROJECTS_REQUEST,
  SEARCH_PROJECTS_SUCCESS,
} from "./ActionTypes";

export const fetchProject =
  ({ category, tag }) =>
  async (dispatch) => {
    dispatch({ type: FETCH_PROJECTS_REQUEST });
    try {
      const { data } = await api.get("/api/projects", {
        params: { category, tag },
      });
      console.log("ALL PROJECTS: ", data);
      dispatch({ type: FETCH_PROJECTS_SUCCESS, projects: data });
    } catch (error) {
      console.log(error);
    }
  };

export const searchProjects = (keyword) => async (dispatch) => {
  dispatch({ type: SEARCH_PROJECTS_REQUEST });
  try {
    const { data } = await api.get("/api/projects/search?keyword=" + keyword);
    console.log("ALL SEARCH RESULTS: ", data);
    dispatch({ type: SEARCH_PROJECTS_SUCCESS, projects: data });
  } catch (error) {
    console.log(error);
  }
};

export const createProjects = (projectData) => async (dispatch) => {
  dispatch({ type: CREATE_PROJECTS_REQUEST });
  try {
    const { data } = await api.post("/api/projects", projectData);
    console.log("Created Project: ", data);
    dispatch({ type: CREATE_PROJECTS_SUCCESS, project: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchProjectById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_PROJECTS_BY_ID_REQUEST });
  try {
    const { data } = await api.get("/api/projects/" + id);
    console.log("Project: ", data);
    dispatch({ type: FETCH_PROJECTS_BY_ID_SUCCESS, project: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProject =
  ({ projectId }) =>
  async (dispatch) => {
    dispatch({ type: DELETE_PROJECTS_REQUEST });
    try {
      const { data } = await api.delete("/api/projects/" + projectId);
      console.log("Project Deleted: ", data);
      dispatch({ type: DELETE_PROJECTS_SUCCESS, projectId });
    } catch (error) {
      console.log(error);
    }
  };

export const inviteToProject =
  ({ email, projectId }) =>
  async (dispatch) => {
    dispatch({ type: INVITE_TO_PROJECT_REQUEST });
    try {
      const { data } = await api.post("/api/projects/invite", {
        email,
        projectId,
      });
      console.log("Invited to Project: ", data);
      dispatch({ type: INVITE_TO_PROJECT_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const acceptInvitation =
  ({ token, navigate }) =>
  async (dispatch) => {
    dispatch({ type: ACCEPT_INVITATION_REQUEST });
    try {
      const { data } = await api.get("/api/projects/accept_invitation", {
        params: {
          token,
        },
      });
      navigate("/project/" + data.projectId);
      console.log("Invited to Project: ", data);
      dispatch({ type: ACCEPT_INVITATION_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
