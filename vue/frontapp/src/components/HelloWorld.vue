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
      <tr v-for="(task, index) in tasks" :key="task.id">
        <td>
          <input v-model="task.taskname" type="text">
        </td>
        <td>
          <input type="button" value="update" v-on:click="taskUpdate(task.id, task.taskname)">
        </td>
        <td>
          <input type="button" value="delete" v-on:click="taskDelete(task.id, index)">
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
    },
    taskDelete: async function(id, index) {
      try {
        await axios.delete("http://localhost:3000/task/" + id);
        this.currentTask= "";
        this.tasks.splice(index, 1);
      } catch (err) {
        alert(JSON.stringify(err));
      }
    },
    taskUpdate: async function(id, val){
      try{
        await axios.put("http://localhost:3000/task/" + id, {
          task: val
        });
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
