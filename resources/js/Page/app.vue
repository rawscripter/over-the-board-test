<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <UserHeader
          @searchUser="searchUser"
          @createNewUser="createNewUser"
        ></UserHeader>
        <UsersTable
          :isLoading="isLoading"
          @updateUser="updateUser"
          @deleteUser="deleteUser"
          :users="usersList"
        ></UsersTable>
      </div>
    </div>
  </div>
</template>


<script>
import UsersTable from "@/components/UsersTable.vue";
import UserHeader from "@/components/UserHeader.vue";
import { ref, onMounted } from "vue";
export default {
  name: "App",
  components: {
    UsersTable,
    UserHeader,
  },
  setup() {
    const usersList = ref([]);
    const isLoading = ref(false);
    const fetchUsers = async () => {
      try {
        isLoading.value = true;
        const response = await axios.get("/api/users");
        usersList.value = response.data.data;
      } catch (err) {
        // alert("Something went wrong.Please try again");
      } finally {
        isLoading.value = false;
      }
    };
    const searchUser = async (searchText) => {
      try {
        isLoading.value = true;
        const response = await axios.get(`/api/users/search/${searchText}`);
        usersList.value = response.data.data;
      } catch (err) {
        // alert("Something went wrong.Please try again");
      } finally {
        isLoading.value = false;
      }
    };
    const createNewUser = async (formData) => {
      try {
        const res = await axios.post("/api/users", formData);
        usersList.value.push(res.data.data);
        alert("User created successfully");
      } catch (err) {
        alert("Something went wrong.Please try again");
      }
    };
    const updateUser = async (formData) => {
      try {
        const res = await axios.put(
          `/api/users/${formData.value.id}`,
          formData.value
        );
        const index = usersList.value.findIndex(
          (user) => user.id === formData.value.id
        );
        usersList.value[index] = res.data.data;
        alert("User updated successfully");
      } catch (err) {
        alert("Something went wrong.Please try again");
      }
    };

    const deleteUser = async (id) => {
      try {
        const res = await axios.delete(`/api/users/${id}`);
        usersList.value = usersList.value.filter((user) => user.id !== id);
        alert("User deleted successfully");
      } catch (err) {
        alert("Something went wrong.Please try again");
      }
    };

    // fetch users on component mounted
    onMounted(fetchUsers);
    return {
      usersList,
      deleteUser,
      searchUser,
      createNewUser,
      updateUser,
      isLoading,
    };
  },
};
</script>
