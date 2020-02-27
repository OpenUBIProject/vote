<template>
  <table class="candidates-list">
    <thead>
      <tr>
        <th class="name-th"><span>Name</span></th>
        <th>UBI Caucus Member</th>
        <th>No Corporate PAC Money</th>
        <th>Public College for All</th>
        <th>Green New Deal</th>
        <th>Medicare for All</th>
        <th>$15 Minimum Wage (or better)</th>
      </tr>
    </thead>
    <tbody>
      <CandidateRow
        class="row"
        v-for="candidate of candidates"
        :key="candidate['Best Name']"
        :candidate="candidate"
      />
    </tbody>
  </table>
</template>

<script>
import CandidateRow from "@/components/CandidateRow.vue";
import presidentialCandidates from "@/president.json";
import senateCandidates from "@/senate.json";
import houseCandidates from "@/house.json";

export default {
  name: "CandidatesList",
  components: {
    CandidateRow
  },
  computed: {
    candidates() {
      return presidentialCandidates
        .concat(senateCandidates)
        .concat(houseCandidates)
        .filter(c => c.UBI !== "");
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

<style lang="scss">
.candidates-list {
  table * {
    display: block;
  }

  table,
  tbody {
    display: block;
    width: 100%;
  }

  tr {
    display: grid;
    grid-template-columns: 200px 1fr 1fr 1fr 1fr 1fr 1fr;
    justify-content: center;
    align-items: center;
    width: 100%;

    &:last-child td {
      border-bottom-style: none;
    }
  }

  thead tr {
    margin-bottom: -2px;
  }

  td,
  th {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0.9em;
    border: 1px solid hsl(210, 30%, 90%);
    border-top-style: none;
    border-left-style: none;
    &:last-child {
      border-right-style: none;
    }
  }

  th.name-th span {
    display: none;
  }
}
</style>
