<template>
    <div class="container">
         <router-view></router-view>
    </div>
</template>

<style type="text/css">
    *{
        padding: 0;
        margin: 0;
    }

    body,html{
        width: 100%;
        height: 100%;
    }

	.container {
        width: 100%;
        height: 100%;
        background-color: rgb(227, 227, 227);
        padding: 0;
        margin: 0;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #333333;
    }
    .fade-enter-active, .fade-leave-active {
	  transition: all .3s ease 0;
	}
	.fade-enter, .fade-leave-active {
      opacity: 0;
	}
</style>