<template>
    <div class="search-bar">
        <!-- <p>Search Bar</p> -->
        <form action="" class="form">
       
            <ToDoFIlterDropdown/>
            <input type="text" id="fname" name="task" placeholder="search a tasks..." class="input">
            <button class="button-searchBar btn btn-primary">Search</button>


        </form>
    </div>
</template>
<script setup>

</script>

<style scoped>

.button-searchBar{
    font-size: 2rem;
    border-top-right-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    height: 3rem;
    display: flex;
    align-items: center;
    background-color: #23242a !important;
}
.input{
    width: 70%;
    /* border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem; */
  height: 3rem;
}
input::placeholder {
  /* color: red; */
  font-style: italic;
  font-size: 1.3rem;
  text-indent: 1rem;
  padding-top: 10px;
}

.form{
    /* border: 2px solid green; */
    width: 100%;
    display: flex;
    justify-content: center;
    height: 100%;
}
.search-bar{
    width: 100%;
    margin-bottom: 2rem;
}
.filter-search-bar{
    font-size: 2rem;
    border-top-right-radius: 0rem;
    border-bottom-right-radius: 0rem;
    border-bottom-left-radius: 0.3rem;
    border-top-left-radius: 0.3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    background-color: #0d6efd;
}
</style>
