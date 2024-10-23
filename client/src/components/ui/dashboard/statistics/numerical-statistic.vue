<template>
  <dashboard-card>
    <div :class="$style.component">
        <span :class="$style.label">
        {{ label }}
      </span>

      <span :class="$style.value">
        {{ formattedValue }}
      </span>

      <span
        v-if="altValue"
        :class="$style.alt">
        {{ formattedAltValue }}
      </span>
    </div>
  </dashboard-card>
</template>

<script lang="ts">
// Packages
import Vue from 'vue';

// Local Imports
import {
  dateString,
  daysSince,
  numberWithCommas,
} from '../../../../helpers/format';
import DashboardCard from '../card/dashboard-card.vue';

/**
 * Displays a raw numerical statistic.
 */
export default Vue.extend({
  name: 'numerical-statistic',

  components: {
    DashboardCard,
  },

  props: {
    label: {
      type: String,
      default: 'Unknown Statistic',
    },

    value: {
      type: Number,
      default: 0,
    },

    type: {
      type: String,
      default: 'number',
    },

    increase: {
      type: Number,
      default: 0,
    },

    increaseType: {
      type: String,
      default: 'number',
    },

    altLabel: {
      type: String,
      default: '',
    },

    altValue: {
      type: Number,
      default: 0,
    },

    altValueType: {
      type: String,
      default: 'number',
    },
  },

  computed: {
    /**
     * Value prop formated by type.
     *
     * @returns {string} Formatted value.
     */
    formattedValue(): string {
      return this.formatValue(
        this.value,
        this.type,
      );
    },

    /**
     * Alt value prop formated by type.
     *
     * @returns {string} Formatted alt value.
     */
    formattedAltValue(): string {
      return this.formatValue(
        this.altValue,
        this.altValueType,
      );
    },
  },

  methods: {
    /**
     * Formats a value.
     *
     * @param {number} value Value to format.
     * @param {string} type Type of formatting.
     * @returns {string} Value formatted.
     */
    formatValue(
      value: number,
      type: string,
    ): string {
      if (type === 'precent') {
        return `${numberWithCommas(Math.round(value * 1000) / 100)}%`;
      } if (type === 'date') {
        return dateString(value);
      } if (type === 'days-since') {
        const diff = daysSince(
          value,
          Date.now(),
          true,
          true,
          true,
          false,
          false,
          false,
        );

        return `${diff}`;
      }
      return `${numberWithCommas(value)}`;
    },
  },
});
</script>

<style lang="scss" module>
.component {
  display: flex;
  flex-direction: column;
  min-width: 200px;
}
.label,
.value,
.alt {
  color: white;
}

.label {
  font-size: 14px;
}

.value {
  font-size: 32px;
}

.alt {
  font-size: 14px;
}
</style>
