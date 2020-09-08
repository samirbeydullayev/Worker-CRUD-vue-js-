<template>
  <div id="WorkerComponent">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <div class="table-header d-flex justify-content-between align-items-center">
          <button
            class="btn btn-primary btn-sm"
            data-toggle="modal"
            data-target="#addWorkerModal"
            @click="onResetForm()"
          >Add Worker</button>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              v-model="searchText"
              placeholder="Search Worker"
            />
          </div>
        </div>
        <div class="table-body">
          <table class="table table-bordered table-striped">
            <thead>
              <th>Id</th>
              <th>Image</th>
              <th>Fullname</th>
              <th>Job</th>
              <th>Tools</th>
            </thead>
            <tbody v-if="filtered.length">
              <tr v-for="(worker,index) in filtered" :key="index">
                <td>
                  <span class="badge badge-primary">{{worker.Id}}</span>
                </td>
                <td>
                  <img
                    class="img-thumbnail"
                    width="100"
                    height="100"
                    :src="worker.image ? worker.image : require('../assets/noimg.png')"
                    alt
                  />
                </td>
                <td>{{worker.firstname}} {{worker.lastname}}</td>
                <td>{{getCategories.find(c=>c.Id == worker.jobId).name}}</td>

                <td>
                  <button
                    data-toggle="modal"
                    data-target="#editWorkerModal"
                    class="btn btn-warning btn-sm"
                    @click="onDetailWorker(worker.Id)"
                  >
                    <i class="far fa-edit"></i>
                  </button>
                  <button @click="removeWorker(worker.Id)" class="btn btn-danger btn-sm">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="!filtered.length" class="alert alert-warning text-center">Data not found</div>

          <div>
            <span>
              Result:
              <b>{{getWorkers.length}}</b>
            </span>

            <span v-if="searchText.length">
              - Filter Result:
              <b>{{filtered.length}}</b>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Worker create modal -->

    <div
      class="modal fade"
      id="addWorkerModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add Worker</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <ValidationObserver ref="observer" v-slot="{ handleSubmit,invalid }">
            <form ref="form">
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-6">
                    <validation-provider v-slot="{classes,errors,failed}" rules="required|min:3">
                      <div class="form-group" :class="classes">
                        <label for>Firstname</label>
                        <input
                          :class="{'is-invalid':failed}"
                          class="form-control"
                          type="text"
                          v-model="worker.firstname"
                        />
                        <small class="text-danger">{{errors[0]}}</small>
                      </div>
                    </validation-provider>
                  </div>

                  <div class="col-md-6">
                    <validation-provider v-slot="{errors,failed}" rules="required|min:5">
                      <div class="form-group">
                        <label for>Lastname</label>
                        <input
                          :class="{'is-invalid':failed}"
                          class="form-control"
                          type="text"
                          v-model="worker.lastname"
                        />
                        <small class="text-danger">{{errors[0]}}</small>
                      </div>
                    </validation-provider>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <label for>Image</label>
                      <div class="row">
                        <div class="col-md-8">
                          <input class="form-control" type="text" v-model="worker.image" />
                        </div>
                        <div class="col-md-4">
                          <img
                            class="img-thumbnail"
                            :src="worker.image ? worker.image : require('../assets/noimg.png')  "
                            width="100"
                            height="100"
                            alt
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <validation-provider v-slot="{errors,failed}" rules="required">
                      <div class="form-group">
                        <label for>Job</label>
                        <select
                          :class="{'is-invalid':failed}"
                          class="form-control"
                          v-model="worker.jobId"
                        >
                          <option value selected>Select option</option>
                          <option
                            v-for="(cat,index) in getCategories"
                            :key="index"
                            :value="cat.Id"
                          >{{cat.name}}</option>
                        </select>
                        <small class="text-danger">{{errors[0]}}</small>
                      </div>
                    </validation-provider>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-info" @click="onResetForm()">Reset</button>
                <button
                  type="submit"
                  @click.prevent="handleSubmit(onSubmitCreate)"
                  class="btn btn-primary"
                  :disabled="invalid"
                >Save changes</button>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>

    <!-- Worker create modal -->

    <div
      class="modal fade"
      id="editWorkerModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit Worker</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <ValidationObserver ref="workerUpdateForm" v-slot="{ handleSubmit,invalid }">
            <form @submit.prevent=" handleSubmit(onSubmitUpdate)">
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-6">
                    <validation-provider v-slot="{errors,failed}" rules="required|min:3">
                      <div class="form-group">
                        <label for>Firstname</label>
                        <input
                          :class="{'is-invalid':failed}"
                          class="form-control"
                          type="text"
                          v-model="worker.firstname"
                        />
                        <small class="text-danger">{{errors[0]}}</small>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="col-md-6">
                    <validation-provider v-slot="{errors,failed}" rules="required|min:4">
                      <div class="form-group">
                        <label for>Lastname</label>
                        <input
                          :class="{'is-invalid':failed}"
                          class="form-control"
                          type="text"
                          v-model="worker.lastname"
                        />
                        <small class="text-danger">{{errors[0]}}</small>
                      </div>
                    </validation-provider>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <label for>Image</label>
                      <div class="row">
                        <div class="col-md-8">
                          <input class="form-control" type="text" v-model="worker.image" />
                        </div>
                        <div class="col-md-4">
                          <img
                            class="img-thumbnail"
                            :src="worker.image"
                            width="100"
                            height="100"
                            alt
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-6">

                    <validation-provider v-slot="{errors,failed}" rules="required">

                    <div class="form-group">
                      <label for>Job</label>
                      <select :class="{'is-invalid':failed}" class="form-control" v-model="worker.jobId">
                        <option value selected>Select option</option>
                        <option
                          v-for="(cat,index) in getCategories"
                          :key="index"
                          :value="cat.Id"
                        >{{cat.name}}</option>
                      </select>
                      <small class="text-danger"> {{errors[0]}} </small>
                    </div>
                    </validation-provider>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button :disabled="invalid" type="submit" class="btn btn-primary">Save changes</button>
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
import { workerFilter } from "./../mixins/FilterMixins";

export default {
  name: "WorkerComponent",

  data: function () {
    return {
      tableName: "Worker",
      worker: {
        firstname: null,
        lastname: null,
        image: null,
        jobId: "",
      },
    };
  },
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  methods: {
    onSubmitCreate() {
      this.$store.dispatch("saveWorker", this.worker).then(() => {
        alert("Successfully added :)");
        $("#addWorkerModal").modal("hide");
      });
    },
    removeWorker(key) {
      if (key) {
        this.$store.dispatch("deleteWorker", key);
      } else {
        alert("Try again");
      }
    },
    onDetailWorker(key) {
      let detail = this.getWorker(key);
      this.worker = detail;
    },
    onSubmitUpdate() {
      this.$store.dispatch("updateWorker", this.worker).then(() => {
        $("#editWorkerModal").modal("hide");
      });
    },
    onResetForm() {
      this.worker = {
        firstname: null,
        lastname: null,
        image: null,
        jobId: "",
      };
      this.$refs.observer.reset();
    },
  },

  computed: {
    ...mapGetters(["getWorkers", "getWorker", "getCategories"]),
  },
  mixins: [workerFilter],
  created() {
    EventBus.$emit("tableName", this.tableName);
  },
};
</script>

<style lang="scss" scoped>
</style>
