<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Worker CRUD</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <router-link tag="li" class="nav-item" active-class="active" to="/">
          <a class="nav-link" href="#">
            Worker Table
            <span class="sr-only">(current)</span>
          </a>
        </router-link>
        <router-link tag="li" class="nav-item" active-class="active" to="/categories">
          <a class="nav-link" href="#">Category Table</a>
        </router-link>
      </ul>
    </div>
  </nav>
</template>
