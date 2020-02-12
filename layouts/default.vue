<template>
  <div>
    <nav
      class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
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
}
</script>
