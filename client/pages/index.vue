<template>

  <section>

    <form class="containerHeader" @submit.prevent>
      <input 
      v-bind:value='title' 
      type="text" 
      placeholder="Название"
      @input="title = $event.target.value"
      >

      <input 
      v-bind:value='body' 
      type="text" 
      placeholder="Описание"
      @input="body = $event.target.value"
      >

      <button class="btn" @click="createNewTask">Создать</button>

    </form>

    <div class="name" v-if="post.length === 0"><h4>Пока нет никаких записей</h4></div>

    <div v-else class="posts" v-for="posts in post">
      <div><strong>Название:</strong> {{posts.title}} </div>
      <div><strong>Описание:</strong> {{posts.body}} </div>
      <button class="btn" @click="deleteTodo">Удалить</button>
    </div>

  </section>

</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      post: [],
      obj: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    createNewTask() {
      const newPost = {
        id: Date.now(),
        title: this.title,
        body: this.body
      }
      
      this.post.push(newPost)

      let todoObj = this.obj = {
        title: this.title,
        body: this.body
      }
      console.log(todoObj)
      axios.post('http://localhost:9000/api', todoObj)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
      this.title = ''
      this.body = ''
    },
    deleteTodo(){
      this.post.splice(this.post.indexOf(),1);
    },
    async fetcP() {
      try {
        const response = await axios.get('http://localhost:9000/api')
        console.log(response.data)
        this.post = response.data
      } catch (e) {
        console.log(e)
      }
    },
  },
  mounted() {
    this.fetcP()
  }
}
</script>

<style>
  * {
    margin: 0%;
    padding: 0%;
    box-sizing: border-box;
  }

  body {
    background-color: gray;
  }

  .containerHeader {
    margin: auto;
    padding: 20px;
    height: auto;
    width: auto;
    
  }

  input[type=text] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 0;
    outline: 0;
    border-radius: 20px;
    background-color: whtie;
    font-size: 30px;
  }

  .name {
    text-align: center;
  }

  .posts {
    margin: auto;
    padding: 20px;
    height: auto;
    width: auto;
    border-radius: 40px;
    background-color: #ffff;
  }

  .btn {
  min-width: 130px;
  height: 40px;
  color: #fff;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  border-radius: 20px;
  border: 2px solid #57cc99;
  background: #57cc99;
}
.btn:hover {
  background: #fff;
  color: #57cc99
}
</style>