<template>
  <div class="table-responsive">
    <table class="table">
      <caption>
        Total Users:
        {{
          users.length
        }}
      </caption>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Location</th>
          <th scope="col">Phone</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="index">
          <th scope="row">1</th>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.location }}</td>
          <td>{{ user.phone }}</td>
          <td>
            <span class="btn text-info" @click="openUserEditModal(user.id)">
              Edit
            </span>
            <span class="btn text-danger" @click="deleteUser(user.id)">
              Delete
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div
    class="modal fade"
    :class="{ show: showUserEditModal }"
    id="CreateUser"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">Update User</h5>
        </div>
        <div class="modal-body">
          <form @submit.prevent="updateUser">
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
                @click="closeUserEditModal"
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
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const showUserEditModal = ref(false);

    const formData = ref({
      name: "",
      email: "",
      location: "",
      phone: "",
    });

    const closeUserEditModal = () => {
      showUserEditModal.value = false;
    };

    const openUserEditModal = (userId) => {
      const user = props.users.find((user) => user.id === userId);
      formData.value = { ...user };
      showUserEditModal.value = true;
    };

    const updateUser = () => {
      emit("updateUser", formData);
      closeUserEditModal();
    };

    const deleteUser = (id) => {
      emit("deleteUser", id);
    };

    return {
      showUserEditModal,
      formData,
      closeUserEditModal,
      openUserEditModal,
      updateUser,
      deleteUser,
    };
  },
};
</script>
<style scoped>
.show {
  display: block !important;
}
</style>
