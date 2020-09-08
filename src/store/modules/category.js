import axios from "axios";



const state = {
  categories: []

}

const getters = {

  getCategories(state) {
    return state.categories
  },
  getCategory(state) {


    return (key) => {
      console.log(key)
      return state.categories.find(c => c.Id == key);

    }
  }

}

const mutations = {

  pushCategories(state, category) {

    state.categories.push(category);
  },

  shiftCategories(state, key) {
    let obj = state.categories.find(c => c.Id == key);
    let index = state.categories.indexOf(obj)
    state.categories.splice(index, 1)
  }



}

const actions = {
  initAppCategory({
    commit,
    state
  }) {

    if (!state.categories.length) {

      axios
        .get("/categories.json")
        .then((res) => {
          let data = res.data;

          for (let key in data) {
            data[key].Id = key;

            commit("pushCategories", data[key])
          }
        })
    }


  },

  saveCategory({
    commit,
    state
  }, categoryList) {

    categoryList.forEach(obj => {
      return axios
        .post("/categories.json", obj)
        .then((res) => {
          obj.Id = res.data.name;
          commit("pushCategories", obj)
        })
    });







  },

  updateCategory({}, category) {
    return axios
      .patch("/categories/" + category.Id + ".json", category)



  },
  deleteCategory({
    commit
  }, key) {
    axios
      .delete("/categories/" + key + ".json")
      .then((res) => {

        commit("shiftCategories", key);

      })

  }

}


export default {
  state,
  getters,
  mutations,
  actions
}
