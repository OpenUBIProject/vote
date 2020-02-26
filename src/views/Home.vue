<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <CandidatesList />
  </div>
</template>

<script>
import CandidatesList from "@/components/CandidatesList.vue";

export default {
  name: "Home",
  components: {
    CandidatesList
  }
};
</script>
