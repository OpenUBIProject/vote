<template>
  <div class="candidates-list-wrapper">
    <table class="candidates-list">
      <thead>
        <tr>
          <th class="name-th"><span>Name</span></th>
          <th>UBI Caucus Member</th>
          <th>No Corporate PAC Money</th>
          <th>Public College for All</th>
          <th>Green New Deal</th>
          <th>Medicare for All</th>
          <th>Links</th>
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
  </div>
</template>

<script>
import CandidateRow from "@/components/CandidateRow.vue";

export default {
  name: "CandidatesList",
  components: {
    CandidateRow
  },
  props: {
    candidates: Array
  }
};
</script>

<style scoped lang="scss">
.candidates-list-wrapper {
  overflow-x: auto;
}
</style>

<style lang="scss">
.candidates-list {
  min-width: 957px;

  table * {
    display: block;
  }

  table,
  tbody,
  thead {
    display: block;
    width: 100%;
  }

  tr {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 1fr;
    justify-content: center;
    align-items: center;
    width: 100%;

    &:last-child td {
      border-bottom-style: none;
    }
  }

  td,
  th {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-width: 0;
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
