import {
  ALL_ACTIVITIES,
  ADD_ACTIVITY,
  UPDATE_STATUS,
  DELETE_ACTIVITY,
} from "@/constants/api";

const state = {
  activities: [],
};

const getters = {
  allActivities: (state) => state.activities,
};

const actions = {
  async GET_ACTIVITIES(context) {
    let response = "";
    try {
      response = await axios.get(ALL_ACTIVITIES);
      context.commit("setActivities", response.data);
    } catch (err) {
      console.log("Error fetching activities: ", err.response);
    }
  },

  async POST_ACTIVITY(context, payload) {
    let postData = {
      title: payload.title,
      description: payload.description,
      isComplete: false,
    };
    let response = "";

    response = await axios.post(ADD_ACTIVITY, postData);
    if (response.status === 200 || response.status === 201) {
      context.commit("pushActivity", response.data);
    } else {
      console.log("Received a non-success status code:", response.status);
    }
  },

  async PATCH_ACTIVITY(context, payload) {
    try {
      await axios.patch(`${UPDATE_STATUS}/${payload.activityId}`, {
        isComplete: payload.updatedStatus,
      });
      context.commit("updateActivityStatus", payload);
    } catch (err) {
      console.log("Error changing status: ", err.response);
    }
  },

  async DELETE_ACTIVITY(context, payload) {
    try {
      await axios.delete(`${DELETE_ACTIVITY}/${payload.activityId}`);
      context.commit("deleteActivity", payload.activityId);
    } catch (err) {
      console.log("Error deleting activity: ", err.response);
    }
  },
};

const mutations = {
  setActivities(state, activities) {
    state.activities = activities;
  },

  pushActivity(state, newActivity) {
    state.activities.push(newActivity);
  },

  deleteActivity(state, activityId) {
    state.activities = state.activities.filter(
      (activity) => activity.id !== activityId
    );
  },

  updateActivityStatus(state, payload) {
    const activity = state.activities.find((a) => a.id === payload.activityId);
    if (activity) {
      activity.isComplete = payload.updatedStatus;
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
