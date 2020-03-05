<template>
  <div :class="['home', notSearchedYet ? 'not-searched-yet' : '']">
    <h1>Vote UBI</h1>
    <p class="description">
      Some text about Vote UBI. Lots of words are good for testing things. Lots
      of words are good for testing things. Lots of words are good for testing
      things. Lots of words are good for testing things. Lots of words are good
      for testing things. Lots of words are good for testing things. Lots of
      words are good for testing things. Lots of words are good for testing
      things. Lots of words are good for testing things. Lots of words are good
      for testing things.
    </p>
    <input
      id="search"
      type="text"
      class="search"
      v-model="search"
      placeholder="Search by name, state, district or house/senate/president"
      autocomplete="off"
      @input="notSearchedYet = false"
    />
    <div v-if="notSearchedYet /* || search.length === 0*/"></div>
    <div v-else-if="candidates.length === 0" class="empty-placeholder">
      ⚠&nbsp;&nbsp;No actively running candidates found
    </div>
    <CandidatesList v-else :candidates="candidates" />
  </div>
</template>

<script>
import CandidatesList from "@/components/CandidatesList.vue";

import candidates from "@/candidates.json";

import { padWithZeroes } from "@/helperFunctions";

export default {
  name: "CandidatesPage",
  components: {
    CandidatesList
  },
  computed: {
    candidates() {
      return candidates
        .filter(this.candidateFilteringFunction)
        .sort(this.candidateSortingFunction);
    }
  },
  data() {
    return {
      search: "",
      notSearchedYet: true
    };
  },
  methods: {
    padWithZeroes,
    bestDistrictToNumber(bestDistrict) {
      return Number(bestDistrict.replace(/[^0-9]/g, ""));
    },
    candidateFilteringFunction(candidate) {
      // const start = performance.now();
      const searchKeywords = this.search
        .split(" ")
        .map(this.transformForSearch)
        .filter(string => string.length > 0);

      if (searchKeywords.length === 0) return false;

      const candidateKeywords = candidate["Candidate Keywords"]
        .replace(/([A-Z][A-Z])-([0-9][0-9])/g, "$1 $2")
        .split(" ")
        .map(this.transformForSearch);

      const shouldDisplay = searchKeywords.every(
        searchKeyword =>
          !!candidateKeywords.find(candidateKeyword =>
            candidateKeyword.startsWith(searchKeyword)
          )
      );
      // console.log(
      //   "Returned",
      //   shouldDisplay,
      //   "in",
      //   performance.now() - start,
      //   "ms"
      // );
      return shouldDisplay;
    },
    transformForSearch(string) {
      return string
        .toLowerCase()
        .replace(/-/g, ``) // So CA05 = CA-05
        .replace(/ /g, ``) // So CA 05 = CA-05
        .replace(/0/g, ``); // So CA-5 = CA-05
    },
    candidateSortingFunction(candidate1, candidate2) {
      let toReturn = 0;

      // First priority: Are they still running?
      // Edit: Column no longer exists
      // let toReturn = candidate1["Suspended"] - candidate2["Suspended"];

      // Second priority: Are they in the UBI Caucus?
      if (toReturn === 0) {
        toReturn =
          this.boolCellToNum(candidate2["UBI"]) -
          this.boolCellToNum(candidate1["UBI"]);
      }

      // Third priority: How many policies do they support?
      if (toReturn === 0) {
        const boolFields = ["UBI", "No Corp", "C4A", "GND", "M4A"];

        const candidate1Total = boolFields
          .map(field => this.boolCellToNum(candidate1[field]))
          .reduce((a, b) => a + b);

        const candidate2Total = boolFields
          .map(field => this.boolCellToNum(candidate2[field]))
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

      // console.log("candidateSortingFunction", toReturn);
      return toReturn;
    },
    boolCellToNum(cellString) {
      return cellString === "1" ? 1 : 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  &.not-searched-yet {
    justify-content: center;
  }
}
h1 {
  margin-bottom: 0;
  .text-bit {
    opacity: 0.7;
  }
}
h2 {
  margin-top: 0.5rem;
  font-weight: 500;
  font-size: 1.2em;
}
.description {
  margin-bottom: 2em;
}
.search {
  margin-bottom: 2rem;
  padding: 1rem;
  border: none;
  font-size: 1em;
  border-radius: 5px;
  width: 100%;
  background: hsl(210, 29%, 90%);
  &::placeholder {
    color: inherit;
    opacity: 0.5;
  }
  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 1px hsl(210, 29%, 85%);
  }
}

.empty-placeholder {
  text-align: center;
  font-size: 1.1em;
  opacity: 0.5;
  // color: hsl(210, 29%, 80%);
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
