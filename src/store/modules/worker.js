import axios from "axios";



const state = {
  workers: []

}

const getters = {

  getWorkers(state) {
    return state.workers
  },
  getWorker(state) {


    return (key) => {
      console.log(key)
      return state.workers.find(c => c.Id == key);

    }
  }

}

const mutations = {

  pushWorkers(state, worker) {
    state.workers.push(worker);
  },

  shiftWorkers(state, key) {
    let obj = state.workers.find(c => c.Id == key);
    let index = state.workers.indexOf(obj)
    state.workers.splice(index, 1)
  }



}

const actions = {
  initAppWorker({
    commit,
    state
  }) {

    if (!state.workers.length) {

      axios
        .get("/workers.json")
        .then((res) => {
          let data = res.data;

          for (let key in data) {
            data[key].Id = key;

            commit("pushWorkers", data[key])
          }
        })
        .catch((error)=>{
         console.error(error);
        })
    }


  },

  saveWorker({
    commit,
    state
  }, worker) {


      return axios
        .post("/workers.json", worker)
        .then((res) => {
          worker.Id = res.data.name;
          commit("pushWorkers", worker)
        })





  },

  updateWorker({}, worker) {
    return axios
      .patch("/workers/" + worker.Id + ".json", worker)



  },
  deleteWorker({
    commit
  }, key) {
    axios
      .delete("/workers/" + key + ".json")
      .then((res) => {

        commit("shiftWorkers", key);

      })

  }


}


export default {
  state,
  getters,
  mutations,
  actions
}
