<template>
    <div class="main">
    <p>index de pages</p>
        <section class="todo">
        <ToDoSearchBar/>
        <ToDoForm/>
        <ToDoList/>
    </section>
    </div>
</template>

<style>
.todo{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60%;
    /* background-color: red; */

}
.main{
    display: flex;
    flex-direction: column;
    align-items: center;
    /* background-color: green; */
    width: 100%;
}
</style>