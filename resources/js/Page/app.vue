<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <UserHeader
          @searchUser="searchUser"
          @createNewUser="createNewUser"
        ></UserHeader>
        <UsersTable
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
import { ref } from "vue";
export default {
  name: "App",
  components: {
    UsersTable,
    UserHeader,
  },
  setup() {
    const usersList = ref([
      {
        id: 1,
        name: "John Doe",
        email: "abc@gmail.com",
        location: "Bangladesh",
        phone: "01700000000",
      },
      {
        id: 1,
        name: "John Doe",
        email: "abc@gmail.com",
        location: "Bangladesh",
        phone: "01700000000",
      },
      {
        id: 1,
        name: "John Doe",
        email: "abc@gmail.com",
        location: "Bangladesh",
        phone: "01700000000",
      },
      {
        id: 1,
        name: "John Doe",
        email: "abc@gmail.com",
        location: "Bangladesh",
        phone: "01700000000",
      },
    ]);

    const deleteUser = (id) => {
      const index = usersList.value.findIndex((user) => user.id === id);
      usersList.value.splice(index, 1);
      alert("User deleted successfully");
    };

    const searchUser = (searchText) => {
      // search user with name or email
      const searchResult = usersList.value.filter((user) => {
        return (
          user.name.toLowerCase().includes(searchText.toLowerCase()) ||
          user.email.toLowerCase().includes(searchText.toLowerCase())
        );
      });
      usersList.value = searchResult;
    };
    const createNewUser = (formData) => {
      // create new user
      usersList.value.push(formData);
      console.log(usersList.value);
      alert("User created successfully");
    };
    const updateUser = (formData) => {
      // update user
      const index = usersList.value.findIndex(
        (user) => user.id === formData.value.id
      );
      usersList.value[index] = formData.value;
      alert("User updated successfully");
    };
    return {
      usersList,
      deleteUser,
      searchUser,
      createNewUser,
      updateUser,
    };
  },
};
</script>
