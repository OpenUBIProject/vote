<template>
  <div id="app">
    <a class="open-ubi-banner" href="https://us.openubiproject.org">
      <div class="open-ubi-banner-inner">
        <img
          src="https://support.us.openubiproject.org/img/>=.svg"
          alt="UBI Caucus Logo"
        />
        <span class="open-ubi-banner-text">
          This site is part of the UBI Caucus ↗</span
        >
      </div>
    </a>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view class="page" />
  </div>
</template>

<style lang="scss">
@import "vue-select/src/scss/vue-select.scss";

@import url("https://rsms.me/inter/inter.css");
html {
  font-family: "Inter", sans-serif;
}
@supports (font-variation-settings: normal) {
  html {
    font-family: "Inter var", sans-serif;
  }
}
.state-abbrev {
  /* Dinstinguish capital Is in state abbreviations */
  font-feature-settings: "ss02";
}

* {
  box-sizing: border-box;
}

html {
  height: 100%;
}

body,
#app,
.page {
  min-height: 100%;
}

body,
#app {
  display: flex;
  flex-direction: column;
}

#app,
.page {
  flex-grow: 1;
}

body {
  margin: 0;
}

#app {
  color: hsl(210, 29%, 24%);
}

#nav {
  color: #9da4ac;
  cursor: default;
}

#nav a {
  font-weight: bold;
  text-decoration: none;
  color: inherit;
}

#nav a.router-link-exact-active {
  color: hsl(210, 29%, 24%);
}

.page,
#nav,
.open-ubi-banner-inner {
  margin-left: auto;
  margin-right: auto;
  max-width: 1264px;
  width: 100%;
  padding: 2rem;
}

.nav-wrapper {
  background: white;
  margin-bottom: -3rem;
  z-index: 1;
}

p a {
  text-decoration: none;
  font-weight: bold;
  color: hsl(203, 89%, 53%);
}

.open-ubi-banner {
  background: #243665;
  color: white;
  font-weight: 400;
  display: block;
  text-decoration: none;
}

.open-ubi-banner-inner {
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  opacity: 0.8;
  transition: opacity 200ms ease-in-out;
}

.open-ubi-banner img {
  height: 1rem;
  margin-right: 0.5rem;
}

.open-ubi-banner:hover .open-ubi-banner-inner {
  opacity: 1;
}
</style>
