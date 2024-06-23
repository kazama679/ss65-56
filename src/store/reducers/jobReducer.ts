import { JobTodo } from "../../interface";

const stateJob: JobTodo[] = JSON.parse(localStorage.getItem("jobs") || "[]");

const jobReducer = (state = stateJob, action: any) => {
  switch (action.type) {
    case "ADD_TODO": {
      const newStateAdd = [...state, action.payload];
      localStorage.setItem("jobs", JSON.stringify(newStateAdd));
      return newStateAdd;
    }
    case "DELETE_TODO":
      const newStateDelete: JobTodo[] = state.filter(job => job.id !== action.payload);
      localStorage.setItem("jobs", JSON.stringify(newStateDelete));
      return newStateDelete;
    case "UPDATE_TODO": {
      const newStateUpdate = state.map(job => {
        if (job.id === action.payload.id) {
          return {
            ...job,
            name: action.payload.name,
            level: action.payload.level
          };
        }
        return job;
      });
      localStorage.setItem("jobs", JSON.stringify(newStateUpdate));
      return newStateUpdate;
    }
    case "TOGGLE_STATUS_TODO": {
      const newStateToggle = state.map(job => {
        if (job.id === action.payload) {
          return {
            ...job,
            status: !job.status
          };
        }
        return job;
      });
      localStorage.setItem("jobs", JSON.stringify(newStateToggle));
      return newStateToggle;
    }
    case "MARK_ALL_COMPLETED": {
      const newStateMarkAllCompleted = state.map(job => ({
        ...job,
        status: true
      }));
      localStorage.setItem("jobs", JSON.stringify(newStateMarkAllCompleted));
      return newStateMarkAllCompleted;
    }
    case "DELETE_ALL_JOBS": {
      const newStateDeleteAll: JobTodo[] = [];
      localStorage.setItem("jobs", JSON.stringify(newStateDeleteAll));
      return newStateDeleteAll;
    }
    default:
      return state;
  }
};

export default jobReducer;