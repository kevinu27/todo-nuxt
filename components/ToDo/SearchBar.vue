<template>
    <div class="search-bar">
        <!-- <p>Search Bar</p> -->
        <form action="" class="form">
            <input type="text" id="fname" name="task" placeholder="search a tasks..." class="input">
            <button class="button">Search</button>
        </form>
    </div>
</template>

<style scoped>

.button{
    background-color: #007bff;
    border: none;
    box-shadow: none;
    outline: none;
    font-size: 2rem;
    padding: 0.5rem 1rem;
    border-top-right-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
}
.input{
    width: 70%;
    border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
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
}
.search-bar{
    width: 100%;
    /* border:3px solid yellow; */
    margin-bottom: 2rem;
}
</style>
