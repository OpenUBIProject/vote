export default {
  computed: {
    state() {
      console.log(this.$route);
      const state = this.$route.params.stateAndDistrict.replace(
        /[^A-Za-z]/g,
        ``
      );
      return state ? state.toUpperCase() : null;
    },
    district() {
      const district = this.$route.params.stateAndDistrict.replace(
        /[^0-9]/g,
        ``
      );
      return district ? Number(district) : null;
    }
  },
  methods: {
    changeRunningFor(runningFor) {
      this.$router.push({ params: { runningFor } });
    }
  }
};
