<template>
  <div id="categoryComponent">
    <div class="row">
      <div :class="[catId.length ?  'col-md-6' : 'col-md-12' ]">
        <div class="table-header d-flex justify-content-between align-items-center">
          <button
            class="btn btn-primary btn-sm"
            data-toggle="modal"
            data-target="#addCategoryModal"
            @click="category = {}"
          >Add Category</button>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              v-model="searchText"
              placeholder="Search Category"
            />
          </div>
        </div>
        <div class="table-body">
          <table class="table table-bordered table-striped">
            <thead>
              <th>Id</th>
              <th>Name</th>
              <th>Tools</th>
            </thead>
            <tbody>
              <tr v-for="(cat,index) in filtered" :key="index">
                <td>
                  <span class="badge badge-primary">{{cat.Id}}</span>
                </td>
                <td>{{cat.name}}</td>
                <td>
                  <button
                    data-toggle="modal"
                    data-target="#editCategoryModal"
                    class="btn btn-warning btn-sm"
                    @click="onDetailCategory(cat.Id)"
                  >
                    <i class="far fa-edit"></i>
                  </button>
                  <button @click="removeCategory(cat.Id)" class="btn btn-danger btn-sm">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                  <button @click="workerListInfo(cat.Id)" class="btn btn-info btn-sm">
                    Worker List
                    <i class="ml-2 fas fa-long-arrow-alt-right"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="!filtered.length" class="alert alert-warning text-center">Data not found</div>
          <div>
            <span>
              Result:
              <b>{{getCategories.length}}</b>
            </span>

            <span v-if="searchText.length">
              - Filter Result:
              <b>{{filtered.length}}</b>
            </span>
          </div>
        </div>
      </div>
      <div v-if="catId.length" class="col-md-6">
        <div class="table-body">
          <table class="table table-bordered table-striped">
            <thead>
              <th>ID</th>
              <th>Fullname</th>
            </thead>
            <tbody>
              <tr v-for="(worker,index) in workerToCategory" :key="index">
                <td>
                  <span class="badge badge-primary">{{worker.Id}}</span>
                </td>
                <td>{{worker.firstname + " " + worker.lastname}}</td>
              </tr>
            </tbody>
          </table>
          <div
            v-if="!workerToCategory.length"
            class="alert alert-warning text-center"
          >This category not worker</div>
        </div>
      </div>
    </div>

    <!-- category create modal -->

    <div
      class="modal fade"
      id="addCategoryModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add Category</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <ValidationObserver v-slot="{handleSubmit,invalid}">
            <form @submit.prevent="handleSubmit(onSubmitCreate)">
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-12">
                    <button type="button" @click="addList" class="btn btn-success">
                      <i class="fas fa-plus"></i>
                    </button>

                    <div v-for="(cat,index) in categoryList" :key="index" class="row mt-2">
                      <div class="col-md-10">
                        <validation-provider v-slot="{errors,failed}" rules="required">
                          <div class="form-group">
                            <label for>Name</label>
                            <input
                              :class="{'is-invalid':failed}"
                              type="text"
                              class="form-control"
                              v-model="cat.name"
                            />

                            <small class="text-danger">{{errors[0]}}</small>
                          </div>
                        </validation-provider>
                      </div>
                      <div class="col-md-2">
                        <label for>Tool</label>
                        <button @click="removeFromList(index)" class="btn btn-danger">
                          <i class="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button
                  :disabled="invalid  || !categoryList.length"
                  type="submit"
                  class="btn btn-primary"
                >Save changes</button>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>

    <!-- category edit modal -->

    <div
      class="modal fade"
      id="editCategoryModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit Category</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <ValidationObserver v-slot="{handleSubmit,invalid}">
            <form @submit.prevent=" handleSubmit(onSubmitUpdate)">
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-12">
                    <label for>Name</label>
                    <div class="row">
                      <div class="col-md-12">
                        <validation-provider rules="required" v-slot="{errors,failed}">
                          <input
                            :class="{'is-invalid':failed}"
                            type="text"
                            class="form-control"
                            v-model="category.name"
                          />
                          <small class="text-danger">{{errors[0]}}</small>
                        </validation-provider>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" :disabled="invalid" class="btn btn-primary">Save changes</button>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { mapGetters } from "vuex";
import { EventBus } from "./../main";
import { categoryFilter } from "./../mixins/FilterMixins";

export default {
  name: "categoryComponent",

  data: function () {
    return {
      tableName: "Category",
      category: {
        name: "",
      },
      categoryList: [],
      workerToCategory: [],
      catId: "",
      check: true,
    };
  },
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  methods: {
    addList() {
      this.categoryList.push(this.category);
      this.category = {};
    },
    removeFromList(index) {
      this.categoryList.splice(index, 1);
    },
    onSubmitCreate() {
      if (this.checkSameData()) {
        this.$store.dispatch("saveCategory", this.categoryList).then((res) => {
          alert("Successfully added :)");
          $("#addCategoryModal").modal("hide");
          this.categoryList = [];
        });
      } else {
        alert("The same data is available ");
      }
    },
    removeCategory(key) {
      if (key) {
        this.$store.dispatch("deleteCategory", key);
      } else {
        alert("Try again");
      }
    },
    onDetailCategory(key) {
      let detailCat = this.getCategory(key);
      this.category = detailCat;
    },
    onSubmitUpdate() {
      this.$store.dispatch("updateCategory", this.category).then(() => {
        $("#editCategoryModal").modal("hide");
      });
    },
    workerListInfo(catId) {
      this.workerToCategory = [];
      this.getWorkers.forEach((worker) => {
        if (worker.jobId == catId) {
          this.workerToCategory.push(worker);
        }
      });
      this.catId = catId;
    },

    checkSameData() {
      this.check = true;
      this.getCategories.forEach((dbcat) => {
        this.categoryList.forEach((cat) => {
          if (dbcat.name == cat.name) {
            this.check = false;
            return;
          }
        });
      });

      return this.check;
    },
  },
  computed: {
    ...mapGetters(["getCategories", "getCategory", "getWorkers"]),
  },
  mixins: [categoryFilter],

  created() {
    EventBus.$emit("tableName", this.tableName);
  },
};
</script>

<style lang="scss" scoped>
</style>
