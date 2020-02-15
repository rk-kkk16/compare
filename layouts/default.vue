<template>
  <div>
    <nav
      class="navbar header has-shadow"
      role="navigation"
      aria-label="main navigation"
      style="background-color:#ffc9d2"
    >
      <div class="navbar-brand">
        <a
          class="navbar-item"
          href="/compare/"
        >
          <img
            src="~assets/logo.png"
            alt="nyanch"
            height="32"
          >
        </a>

        <a
            role="button"
            class="navbar-burger burger"
            :class="{ 'is-active': isActive }"
            aria-label="menu"
            aria-expanded="false"
            @click="toggleMenu"
        >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
        </a>
      </div>

      <div class="navbar-menu navbar-end" :class="{ 'is-active': isActive }">
          <div class="navbar-item">
              <a @click="isActive = !isActive;$router.push({path:'/'})" style="display:block;">TOP</a>
          </div>
          <div class="navbar-item">
              <a @click="isActive = !isActive;$router.push({path:'/items'})" style="display:block">品目管理</a>
          </div>
          <div class="navbar-item">
              <a @click="isActive = !isActive;$router.push({path:'/shops'})" style="display:block">店舗管理</a>
          </div>
      </div>
    </nav>

    <section class="main-content columns">
      <div class="container column is-12">
          <nuxt />
      </div>
    </section>
  </div>
</template>

<script>
export default {
    data() {
        return {
            isActive: false
        };
    },
    methods: {
        toggleMenu(e) {
            this.isActive = !this.isActive;
        }
    }
}
</script>
