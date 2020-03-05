<template>
  <tr class="row">
    <!-- <pre>{{ JSON.stringify(candidate, null, 2) }}</pre> -->
    <td class="name-cell">
      <img
        :src="imageUrl"
        :alt="candidate['Best Name']"
        loading="lazy"
        width="80"
        height="80"
      />
      <div>
        <div class="name">
          {{ candidate["Best Name"] }}
        </div>
        <div class="running-for">{{ partyName }}</div>
        <div class="running-for">Running in {{ candidate["Best DIST"] }}</div>
        <div
          class="no-longer-running-pill"
          v-if="candidate['Suspended'] === '1'"
        >
          ⚠ Dropped out
        </div>
      </div>
    </td>
    <BoolCell :field="candidate['UBI']" :isUBI="true" />
    <BoolCell :field="candidate['No Corp']" />
    <BoolCell :field="candidate['C4A']" />
    <BoolCell :field="candidate['GND']" />
    <BoolCell :field="candidate['M4A']" />
    <td class="learn-more-cell">
      <a :class="twitterUrl ? `` : `hidden`" :href="twitterUrl" target="_blank">
        <font-awesome-icon :icon="['fab', 'twitter']" />
      </a>
      <a
        :class="candidate['Best Website'] ? `` : `hidden`"
        :href="candidate['Best Website']"
        target="_blank"
      >
        <font-awesome-icon :icon="['fas', 'globe']" />
      </a>
    </td>
  </tr>
</template>

<script>
import BoolCell from "@/components/BoolCell.vue";
import { capitalize } from "@/helperFunctions";

export default {
  name: "CandidateRow",
  props: {
    candidate: Object
  },
  components: {
    BoolCell
  },
  computed: {
    imageUrl() {
      return `https://avatars.io/twitter/${this.candidate["Twitter"]}/medium`;
    },
    twitterUrl() {
      if (this.candidate["Twitter"]) {
        return `https://twitter.com/${this.candidate["Twitter"].replace(
          /^@/,
          ""
        )}`;
      } else {
        return "";
      }
    },
    partyName() {
      if (this.candidate["party_full"]) {
        return capitalize(this.candidate["party_full"]);
      } else {
        switch (this.candidate["Best Party"]) {
          case "DEM":
            return "Democratic Party";
          case "REP":
            return "Republican Party";
          case "LIB":
            return "Libertarian Party";
          case "IND":
            return "Independent";
        }
        return "Other";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1rem;
  flex-shrink: 0;
}

.name-cell {
  justify-content: flex-start;
  padding: 0.9em;
  padding-left: 0;
  .name {
    user-select: all;
    font-weight: 500;
  }
  .running-for {
    font-size: 0.9em;
    margin-top: 0.1em;
    opacity: 0.6;
  }
}

.learn-more-cell {
  flex-wrap: wrap;
  a {
    color: inherit;
    margin: 0.25em;
    background: hsl(208, 29%, 90%);
    width: 2em;
    height: 2em;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;

    &.hidden {
      // opacity: 0;
      // pointer-events: none;
      display: none;
    }
  }
}

.no-longer-running-pill {
  font-size: 0.8rem;
  background: hsl(50, 80%, 80%);
  color: hsl(50, 80%, 24%);
  padding: 0.25em 0.75em;
  border-radius: 1em;
  margin-top: 0.5em;
  font-weight: 600;
}
</style>
