
import {mapGetters} from "vuex"

export const categoryFilter = {

  data: function () {
    return {
      searchText: "",
      datas: this.$store.getters.getCategories
    }
  },
  computed: {
    filtered() {
      return this.datas.filter((data) => {
      let  name = data.name.toLowerCase();
        return name.match(this.searchText.toLowerCase())
      })
    }


  }

}



export const workerFilter = {

  data: function () {
    return {
      searchText: "",

    }
  },
  computed: {
    filtered() {
      return this.getWorkers.filter((data) => {
       let  firstname = data.firstname.toLowerCase();
       let   lastname = data.lastname.toLowerCase();
       let   job =   this.getCategories.find(c=>c.Id == data.jobId).name.toLowerCase();


        return firstname.match(this.searchText.toLowerCase()) || lastname.match(this.searchText.toLowerCase()) || job.match(this.searchText.toLowerCase())
      })
    },
    ...mapGetters(["getWorkers","getCategories"])



  },


}



