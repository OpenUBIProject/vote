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
      <span class="name">{{ candidate["Best Name"] }}</span>
    </td>
    <BoolCell :field="candidate['UBI']" :isUBI="true" />
    <BoolCell :field="candidate['No Corp']" />
    <BoolCell :field="candidate['C4A']" />
    <BoolCell :field="candidate['GND']" />
    <BoolCell :field="candidate['M4A']" />
    <BoolCell :field="candidate['15MIN']" />
  </tr>
</template>

<script>
import BoolCell from "@/components/BoolCell.vue";

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
  }
}
</style>
