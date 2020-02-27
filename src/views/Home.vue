<template>
  <div class="home">
    <h1>Vote UBI</h1>
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
        v-model="formState"
        placeholder="State"
      />
      <input
        class="district-number-input"
        type="number"
        v-model="formDistrict"
        placeholder="District number"
      />
      <button>Go</button>
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
      this.$router.push({
        name: "DistrictPage",
        params: {
          stateAndDistrict: formatDistrict(
            this.formState.abbreviation,
            this.formDistrict
          ),
          runningFor: "house"
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  text-align: center;
}
</style>

<style lang="scss">
.district-chooser {
  display: flex;
  width: max-content;
  margin: 0 auto;

  > *:not(:last-child) {
    margin-right: 1em;
  }

  .district-number-input,
  .vs__dropdown-toggle,
  .vs__dropdown-menu {
    padding: 1rem;
    border: none;
    font-size: 1em;
    border-radius: 5px;
    background: hsl(210, 29%, 90%);
  }

  .vs__dropdown-toggle {
    width: 20em;
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
}
</style>
