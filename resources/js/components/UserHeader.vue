<template>
  <!-- search bar and create new user button -->
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Search user"
            aria-label="Search user"
            aria-describedby="button-addon2"
            @keypress="searchUser"
          />
        </div>
      </div>
      <div class="col-md-9">
        <button
          class="btn btn-primary float-end btn-sm"
          @click="openUserCreateModal"
        >
          Create New User
        </button>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div
    class="modal fade"
    :class="{ show: showUserCreateModal }"
    id="CreateUser"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">
            Create New User
          </h5>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createNewUser">
            <div class="form-group">
              <label for="">Name</label>
              <input
                type="text"
                v-model="formData.name"
                required
                class="form-control"
              />
            </div>
            <div class="form-group mt-2">
              <label for="">Email</label>
              <input
                type="email"
                v-model="formData.email"
                required
                class="form-control"
              />
            </div>
            <div class="form-group mt-2">
              <label for="">Location</label>
              <input
                type="text"
                v-model="formData.location"
                required
                class="form-control"
              />
            </div>
            <div class="form-group mt-2">
              <label for="">Phone</label>
              <input
                type="text"
                v-model="formData.phone"
                required
                class="form-control"
              />
            </div>

            <div class="mt-3 d-flex justify-content-between">
              <button
                type="button"
                class="btn btn-danger btn-block"
                data-dismiss="modal"
                @click="closeUserCreateModal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "UserHeader",
  setup(_, { emit }) {
    const showUserCreateModal = ref(false);
    const searchUser = (e) => {
      // emit search event
      emit("searchUser", e.target.value);
    };
    const openUserCreateModal = () => {
      // open user create modal
      showUserCreateModal.value = true;
    };
    const closeUserCreateModal = () => {
      // open user create modal
      showUserCreateModal.value = false;
    };

    const createNewUser = () => {
      // emit create new user event
      emit("createNewUser", formData.value);
      resetForm();
      closeUserCreateModal();
    };

    const resetForm = () => {
      // reset form data
      formData.name = "";
      formData.email = "";
      formData.location = "";
      formData.phone = "";
    };
    const formData = ref({
      name: "",
      email: "",
      location: "",
      phone: "",
    });
    return {
      searchUser,
      openUserCreateModal,
      closeUserCreateModal,
      formData,
      showUserCreateModal,
      createNewUser,
    };
  },
};
</script>

<style scoped>
.show {
  display: block !important;
}
</style>
