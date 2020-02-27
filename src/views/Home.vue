<template>
  <div class="home">
    <h1>Vote UBI</h1>
    <p>Some text about Vote UBI</p>
    <form
      class="district-chooser"
      @submit="
        $event.preventDefault();
        goToDistrict();
      "
    >
      <v-select
        :options="dropdownOptions"
        label="full"
        :clearable="false"
        :reduce="option => option.abbreviation"
        v-model="formState"
        placeholder="State"
      />
      <input
        class="district-number-input"
        type="number"
        v-model="formDistrict"
        placeholder="District number"
        required
        min="1"
        max="60"
      />
      <button type="submit">Go →</button>
    </form>
  </div>
</template>

<script>
import { formatDistrict } from "@/helperFunctions.js";
import states from "@/states.json";

export default {
  name: "Home",
  data() {
    return {
      formState: "",
      formDistrict: ""
    };
  },
  computed: {
    dropdownOptions() {
      return Object.keys(states).map(abbreviation => ({
        abbreviation: abbreviation,
        full: states[abbreviation]
      }));
    }
  },
  methods: {
    goToDistrict() {
      if (!this.formState || !this.formDistrict) {
        alert("Please fill in all form fields!");
      } else {
        this.$router.push({
          name: "DistrictPage",
          params: {
            stateAndDistrict: formatDistrict(this.formState, this.formDistrict),
            runningFor: "house"
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
h1 {
  margin: 0;
}
</style>

<style lang="scss">
.district-chooser {
  display: flex;
  width: max-content;
  margin: 0 auto;
  flex-wrap: wrap;

  > * {
    margin: 0.5em;
    flex-grow: 1;
  }

  .district-number-input,
  .vs__dropdown-toggle,
  .vs__dropdown-menu {
    padding: 1rem;
    border: none;
    font-size: 1em;
    border-radius: 5px;
    background: hsl(210, 29%, 90%);
    // width: 100%;
  }

  .v-select {
    min-width: 20em;
  }

  .district-number-input {
    min-width: 7em;
  }

  .vs__dropdown-toggle {
    width: 100%;
  }

  .vs__dropdown-menu {
    padding: 0.5em 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    box-shadow: none;
  }

  .district-number-input::placeholder,
  .vs__search::placeholder {
    color: inherit;
    opacity: 0.5;
  }

  .district-number-input:focus,
  .v-select.vs--open .vs__dropdown-toggle,
  .vs__dropdown-menu {
    outline: none;
    box-shadow: inset 0 0 0 1px hsl(210, 29%, 85%);
  }

  .v-select.vs--open .vs__dropdown-toggle {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .vs__fade-enter-active,
  .vs__fade-leave-active {
    transition: none;
  }

  button[type="submit"] {
    width: 100%;
    padding: 1rem;
    font: inherit;
    border-radius: 5px;
    border: none;
    background: hsl(203, 89%, 53%);
    color: white;
    cursor: pointer;
    &:hover {
      background: hsl(203, 89%, 50%);
    }
    &:active {
      background: hsl(203, 89%, 47%);
    }
    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px hsl(203, 89%, 80%);
    }
  }
}
</style>
