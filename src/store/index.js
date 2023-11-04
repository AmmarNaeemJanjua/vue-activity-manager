import { createStore } from "vuex";
import activity from "./modules/activity";

export default createStore({
  modules: {
    activity,
  },
});
