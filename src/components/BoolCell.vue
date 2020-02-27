<template>
  <td :class="[className, isUBI ? 'is-ubi' : '']">
    <div class="bool">{{ symbol }}</div>
  </td>
</template>

<script>
export default {
  name: "BoolCell",
  props: {
    field: String,
    isUBI: Boolean
  },
  computed: {
    symbol() {
      switch (this.field) {
        case "1":
          return "✓";
        case "0":
          return "✗";
      }
      return "?";
    },
    className() {
      switch (this.field) {
        case "1":
          return "true";
        case "0":
          return "false";
      }
      return "";
    }
  }
};
</script>

<style lang="scss" scoped>
td {
  // &.is-ubi {
  background: hsl(210, 30%, 98%);
  // }
  .bool {
    background: hsl(210, 30%, 90%);
    width: 2em;
    height: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: default;
  }
  &.true {
    // &.is-ubi {
    background: hsl(120, 49%, 98%);
    // }
    .bool {
      background: hsl(120, 50%, 90%);
      color: hsl(120, 90%, 24%);
    }
  }
  &.false {
    // &.is-ubi {
    background: hsl(0, 70%, 98%);
    // }
    .bool {
      background: hsl(0, 70%, 90%);
      color: hsl(0, 90%, 24%);
    }
  }
}
</style>
