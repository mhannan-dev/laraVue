<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Users</h3>
            <div class="card-tools">
              <div class="float-right">
                <!-- Button trigger modal -->
                <button class="btn btn-success" @click="newUserModal">
                  Add New
                  <i class="fas fa-user-plus fa-fw"></i>
                </button>
              </div>
            </div>
          </div>
          <!-- /.card-header -->
          <div class="card-body table-responsive p-0">
            <table class="table table-hover text-nowrap">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Photo</th>
                  <th>Type</th>
                  <th>Registered At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(user,index) in users" :key="user.id">
                  <td>{{ ++index }}</td>
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td>
                    <img
                      src="https://dummyimage.com/30x30/000/fff"
                      alt="dummyimage"
                    />
                  </td>
                  <td>
                    <span class="tag tag-success">{{ user.type | upText}}</span>
                  </td>
                  <td>{{ user.created_at | formatDate }}</td>
                  <td>
                    <a
                      title="Edit"
                      href="#"
                      class="btn btn-outline-info btn-sm"
                    >
                      <i class="fa fa-edit"></i>
                    </a>
                    <a title="Delete" href="#" class="btn btn-danger btn-sm">
                      <i class="fa fa-trash"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- /.card-body -->
        </div>
        <!-- /.card -->
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="newModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">User Information</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
              <form @submit.prevent="createUser">

                  <div class="form-group">
                      <input v-model="form.name" type="text" name="name" placeholder="Name" class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                      <has-error :form="form" field="name"></has-error>
                  </div>
                  <div class="form-group">
                      <input v-model="form.email" type="email" name="email" placeholder="Email Address" class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                      <has-error :form="form" field="email"></has-error>
                  </div>

                  <div class="form-group">
                        <textarea v-model="form.bio" name="bio" id="bio" placeholder="Short bio for user (Optional)" class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }"></textarea>
                        <has-error :form="form" field="bio"></has-error>
                  </div>

                  <div class="form-group">
                      <select name="type" v-model="form.type" id="type" class="form-control" :class="{ 'is-invalid': form.errors.has('type') }">
                          <option value="">Select User Role</option>
                          <option value="admin">Admin</option>
                          <option value="user">Standard User</option>
                          <option value="author">Author</option>
                      </select>
                      <has-error :form="form" field="type"></has-error>
                  </div>

                  <div class="form-group">
                      <input v-model="form.password" type="password" name="password" id="password" class="form-control" :class="{ 'is-invalid': form.errors.has('password') }" placeholder="Password">
                      <has-error :form="form" field="password"></has-error>
                  </div>

                  <button type="submit" class="btn btn-primary">Save</button>
              </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      users: [],
      form: new Form({
        name: "",
        email: "",
        password: "",
        type: "",
        bio: "",
        photo: "",
      }),
    };
  },

  methods: {
    loadUsers() {
        axios.get("api/user")
        .then(({ data }) => (this.users = data.data ));
    },
    createUser() {
      this.$Progress.start()
      this.form.post("api/user")
      .then((response) => {
        $("#newModal").modal("hide");
        this.loadUsers()
      })
      .catch(error => {
        console.log(error)
      })
      this.$Progress.finish()
    },
    newUserModal() {
      $("#newModal").modal("show");
    },
  },
  created() {
      this.loadUsers();
  }
};
</script>
