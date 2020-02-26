<template>
  <table class="candidates-list">
    <tbody>
      <tr
        class="row"
        v-for="candidate of candidates"
        :key="candidate['Best Name']"
      >
        <td>{{ candidate["Best Name"] }}</td>
        <td>{{ candidate["UBI"] ? "✅" : "❌" }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import presidentialCandidates from "@/president.json";

export default {
  name: "CandidatesList",
  props: {
    msg: String
  },
  computed: {
    candidates() {
      return presidentialCandidates;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
