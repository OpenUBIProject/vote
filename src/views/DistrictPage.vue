<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <h1>
      <span class="text-bit">Candidates who you can vote for in</span>&nbsp;
      <span class="state-abbrev">{{ state }}</span
      >-{{ padWithZeroes(district, 2) }}
    </h1>
    <!-- <h2>And what they support</h2> -->
    <div class="tabs">
      <button @click="changeRunningFor('president')">
        President
      </button>
      <button @click="changeRunningFor('senate')">Senate</button>
      <button @click="changeRunningFor('house')">House</button>
    </div>
    <CandidatesList :candidates="candidates" />
  </div>
</template>

<script>
import CandidatesList from "@/components/CandidatesList.vue";

import presidentialCandidates from "@/president.json";
import senateCandidates from "@/senate.json";
import houseCandidates from "@/house.json";

import states from "@/states.json";

import parsePathMixin from "@/mixins/parsePath";

import { padWithZeroes } from "@/helperFunctions";

export default {
  name: "CandidatesPage",
  components: {
    CandidatesList
  },
  mixins: [parsePathMixin],
  computed: {
    stateName() {
      return states[this.state];
    },
    candidates() {
      switch (this.$route.params.runningFor) {
        case "house":
          return this.houseCandidates;
        case "senate":
          return this.senateCandidates;
      }
      return this.presidentialCandidates;
    },
    presidentialCandidates() {
      return presidentialCandidates.sort(this.candidateSortingFunction);
    },
    senateCandidates() {
      return senateCandidates
        .filter(candidate => candidate.state === this.state)
        .sort(this.candidateSortingFunction);
    },
    houseCandidates() {
      return houseCandidates
        .filter(candidate => candidate.state === this.state)
        .filter(
          candidate =>
            candidate.state === this.state &&
            this.bestDistrictToNumber(candidate["Best DIST"]) === this.district
        )
        .sort(this.candidateSortingFunction);
    }
  },
  methods: {
    padWithZeroes,
    bestDistrictToNumber(bestDistrict) {
      return Number(bestDistrict.replace(/[^0-9]/g, ""));
    },
    candidateSortingFunction(candidate1, candidate2) {
      // First priority: Are they still running?
      let toReturn = candidate1["Suspended"] - candidate2["Suspended"];

      // Second priority: Are they in the UBI Caucus?
      if (toReturn === 0) {
        toReturn = candidate2["UBI"] - candidate1["UBI"];
      }

      // Third priority: How many policies do they support?
      if (toReturn === 0) {
        const boolFields = ["UBI", "No Corp", "C4A", "GND", "M4A", "15MIN"];

        const candidate1Total = boolFields
          .map(field => Number(candidate1[field]))
          .reduce((a, b) => a + b);

        const candidate2Total = boolFields
          .map(field => Number(candidate2[field]))
          .reduce((a, b) => a + b);

        toReturn = candidate2Total - candidate1Total;
      }

      // Fourth priority: Do they have a website link?
      if (toReturn === 0) {
        const candidate1Website = candidate1["Best Website"] ? 1 : 0;
        const candidate2Website = candidate2["Best Website"] ? 1 : 0;
        toReturn = candidate2Website - candidate1Website;
      }

      // Fifth priority: Do they have a Twitter link?
      if (toReturn === 0) {
        const candidate1Twitter = candidate1["Twitter"] ? 1 : 0;
        const candidate2Twitter = candidate2["Twitter"] ? 1 : 0;
        toReturn = candidate2Twitter - candidate1Twitter;
      }

      return toReturn;
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  // margin-bottom: 0;
  .text-bit {
    opacity: 0.7;
  }
}
h2 {
  margin-top: 0.5rem;
  font-weight: 500;
  font-size: 1.2em;
}
</style>
