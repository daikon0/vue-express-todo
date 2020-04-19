<template>
  <div class="hello">
    <form>
      <input type="text" style="display:none">
      <input v-model="currentTask" type="text">
      <input type="button" value="add" v-on:click="taskCreate">
    </form>
    <table align="center" border="0">
      <tr>
        <th>task</th>
        <th>update</th>
        <th>delete</th>
      </tr>
      <tr v-for="(task) in tasks" :key="task.id">
        <td>
          <input v-model="task.taskname" type="text">
        </td>
        <td>
          <input type="button" value="update">
        </td>
        <td>
          <input type="button" value="delete">
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
const axios = require('axios');
export default {
  name: 'HelloWorld',
  data: () => ({
    tasks: [],
    currentTask: ""
  }),
  created: async function () {
    try {
      const result = await axios.get("http://localhost:3000");
      this.tasks = result.data;
    } catch (err) {
      alert(JSON.stringify(err))
    }
  },
  methods: {
    taskCreate: async function() {
      try {
        const result = await axios.post("http://localhost:3000/task", {
          task: this.currentTask
        });
        this.tasks.push(result.data);
        this.currentTask = "";
      } catch (err) {
        alert(JSON.stringify(err));
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
