<template>
<div id="app">
  <h1>Welcome to Sales App 1</h1>
  <nav>
    <router-link to="/products">Product List</router-link>
    <router-link to="/orders">Order List</router-link>
    <router-link to="/create-order">Create Order</router-link>
  </nav>
  <router-view></router-view>

</div>

</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      msg: 'Welcome to Sales App 1'
    }
  }
}


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
