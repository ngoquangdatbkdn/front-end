<template>
  <div
    v-click-outside="onClose"
    :dir="dir"
    class="dropdown v-select"
    :class="dropdownClasses"
  >
    <div ref="toggle" class="dropdown-toggle" @click="toggleDropdown">
      <div ref="selectedOptions" class="vs__selected-options">
        <input
          ref="search"
          :value="`¥${value[0]} - ¥${value[1]}`"
          type="search"
          class="form-control"
          :autocomplete="autocomplete"
          :disabled="disabled"
          @keydown.delete="maybeDeleteValue"
          :placeholder="searchPlaceholder"
          @keyup.esc="onEscape"
          :tabindex="tabindex"
          @keydown.up.prevent="typeAheadUp"
          :readonly="!searchable"
          @keydown.down.prevent="typeAheadDown"
          :id="inputId"
          @keydown.enter.prevent="typeAheadSelect"
          role="combobox"
          @keydown.tab="onTab"
          :aria-expanded="dropdownOpen"
          @input="search = $event.target.value"
          aria-label="Search for option"
        >
      </div>
      <div class="vs__actions">
        <button
          v-show="showClearButton"
          :disabled="disabled"
          type="button"
          class="clear"
          title="Clear selection"
          @click="clearSelection"
        >
          <span aria-hidden="true">&times;</span>
        </button>

        <i
          v-if="!noDrop"
          ref="openIndicator"
          role="presentation"
          class="open-indicator"
        />

        <slot name="spinner">
          <div v-show="mutableLoading" class="spinner">
            Loading...
          </div>
        </slot>
      </div>
    </div>

    <transition :name="transition">
      <div v-if="dropdownOpen" class="dropdown-menu p-3 pt-5">
        <vue-slider
          v-model="innerValue"
          :contained="true"
          :min="range[0]"
          :max="range[1]"
          :tooltip="'always'"
          :tooltip-formatter="formatter"
        />
        <div class=" d-flex flex-row justify-content-between px-2">
          <span>{{ "¥" + range[0] }}</span>
          <span>{{ "¥" + range[1] }}</span>
        </div>

        <div
          class="d-flex flex-row justify-content-end align-items-center mt-4"
        >
          <a class="nav-link nav-link-icon" @click="onSearchBlur">
            {{ $t("common.cancel") }}
          </a>
          <base-button
            class="nav-item"
            outline
            type="primary"
            @click="onApplying"
          >
            {{ $t("common.apply") }}
          </base-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/babel">
import 'vue-slider-component/theme/default.css'
export default {
  props: {
    range: {
      default: [0, 100]
    },
    /**
     * Contains the currently selected value. Very similar to a
     * `value` attribute on an <input>. You can listen for changes
     * using 'change' event using v-on
     * @type {Object||String||null}
     */
    value: {
      default: [0, 100]
    },

    /**
     * An array of strings or objects to be used as dropdown choices.
     * If you are using an array of objects, vue-select will look for
     * a `label` key (ex. [{label: 'This is Foo', value: 'foo'}]). A
     * custom label key can be set with the `label` prop.
     * @type {Array}
     */
    options: {
      type: Array,
      default() {
        return []
      }
    },

    /**
     * Disable the entire component.
     * @type {Boolean}
     */
    disabled: {
      type: Boolean,
      default: false
    },

    /**
     * Can the user clear the selected property.
     * @type {Boolean}
     */
    clearable: {
      type: Boolean,
      default: true
    },

    /**
     * Sets the max-height property on the dropdown list.
     * @deprecated
     * @type {String}
     */
    maxHeight: {
      type: String,
      default: '400px'
    },

    /**
     * Enable/disable filtering the options.
     * @type {Boolean}
     */
    searchable: {
      type: Boolean,
      default: true
    },

    /**
     * Equivalent to the `multiple` attribute on a `<select>` input.
     * @type {Boolean}
     */
    multiple: {
      type: Boolean,
      default: false
    },

    /**
     * Equivalent to the `placeholder` attribute on an `<input>`.
     * @type {String}
     */
    placeholder: {
      type: String,
      default: ''
    },

    /**
     * Sets a Vue transition property on the `.dropdown-menu`. vue-select
     * does not include CSS for transitions, you'll need to add them yourself.
     * @type {String}
     */
    transition: {
      type: String,
      default: 'fade'
    },

    /**
     * Enables/disables clearing the search text when an option is selected.
     * @type {Boolean}
     */
    clearSearchOnSelect: {
      type: Boolean,
      default: true
    },

    /**
     * Close a dropdown when an option is chosen. Set to false to keep the dropdown
     * open (useful when combined with multi-select, for example)
     * @type {Boolean}
     */
    closeOnSelect: {
      type: Boolean,
      default: true
    },

    /**
     * Tells vue-select what key to use when generating option
     * labels when each `option` is an object.
     * @type {String}
     */
    label: {
      type: String,
      default: 'label'
    },

    /**
     * Value of the 'autocomplete' field of the input
     * element.
     * @type {String}
     */
    autocomplete: {
      type: String,
      default: 'off'
    },

    /**
     * Tells vue-select what key to use when generating option
     * values when each `option` is an object.
     * @type {String}
     */
    index: {
      type: String,
      default: null
    },

    /**
     * Callback to generate the label text. If {option}
     * is an object, returns option[this.label] by default.
     *
     * Label text is used for filtering comparison and
     * displaying. If you only need to adjust the
     * display, you should use the `option` and
     * `selected-option` slots.
     *
     * @type {Function}
     * @param  {Object || String} option
     * @return {String}
     */
    getOptionLabel: {
      type: Function,
      default(option) {
        if (this.index) {
          option = this.findOptionByIndexValue(option)
        }

        if (typeof option === 'object') {
          if (!option.hasOwnProperty(this.label)) {
            return console.warn(
              `[vue-select warn]: Label key "option.${this.label}" does not` +
                ` exist in options object ${JSON.stringify(option)}.\n` +
                'http://sagalbot.github.io/vue-select/#ex-labels'
            )
          }
          return option[this.label]
        }
        return option
      }
    },

    /**
     * An optional callback function that is called each time the selected
     * value(s) change. When integrating with Vuex, use this callback to trigger
     * an action, rather than using :value.sync to retreive the selected value.
     * @type {Function}
     * @param {Object || String} val
     */
    onChange: {
      type: Function,
      default: function (val) {
        this.$emit('change', val)
      }
    },

    onInput: {
      type: Function,
      default: function (val) {
        this.$emit('input', val)
      }
    },

    /**
     * Select the current value if selectOnTab is enabled
     */
    onTab: {
      type: Function,
      default: function () {
        if (this.selectOnTab) {
          this.typeAheadSelect()
        }
      }
    },

    /**
     * Enable/disable creating options from searchInput.
     * @type {Boolean}
     */
    taggable: {
      type: Boolean,
      default: false
    },

    /**
     * Set the tabindex for the input field.
     * @type {Number}
     */
    tabindex: {
      type: Number,
      default: null
    },

    /**
     * When true, newly created tags will be added to
     * the options list.
     * @type {Boolean}
     */
    pushTags: {
      type: Boolean,
      default: false
    },

    /**
     * When true, existing options will be filtered
     * by the search text. Should not be used in conjunction
     * with taggable.
     * @type {Boolean}
     */
    filterable: {
      type: Boolean,
      default: true
    },

    /**
     * Callback to determine if the provided option should
     * match the current search text. Used to determine
     * if the option should be displayed.
     * @type   {Function}
     * @param  {Object || String} option
     * @param  {String} label
     * @param  {String} search
     * @return {Boolean}
     */
    filterBy: {
      type: Function,
      default(option, label, search) {
        return (label || '').toLowerCase().indexOf(search.toLowerCase()) > -1
      }
    },

    /**
     * Callback to filter results when search text
     * is provided. Default implementation loops
     * each option, and returns the result of
     * this.filterBy.
     * @type   {Function}
     * @param  {Array} list of options
     * @param  {String} search text
     * @param  {Object} vSelect instance
     * @return {Boolean}
     */
    filter: {
      type: Function,
      default(options, search) {
        return options.filter((option) => {
          let label = this.getOptionLabel(option)
          if (typeof label === 'number') {
            label = label.toString()
          }
          return this.filterBy(option, label, search)
        })
      }
    },

    /**
     * User defined function for adding Options
     * @type {Function}
     */
    createOption: {
      type: Function,
      default(newOption) {
        if (typeof this.mutableOptions[0] === 'object') {
          newOption = { [this.label]: newOption }
        }
        this.$emit('option:created', newOption)
        return newOption
      }
    },

    /**
     * When false, updating the options will not reset the select value
     * @type {Boolean}
     */
    resetOnOptionsChange: {
      type: Boolean,
      default: false
    },

    /**
     * Disable the dropdown entirely.
     * @type {Boolean}
     */
    noDrop: {
      type: Boolean,
      default: false
    },

    /**
     * Sets the id of the input element.
     * @type {String}
     * @default {null}
     */
    inputId: {
      type: String
    },

    /**
     * Sets RTL support. Accepts 'ltr', 'rtl', 'auto'.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir
     * @type {String}
     * @default 'auto'
     */
    dir: {
      type: String,
      default: 'auto'
    },
    /**
     * When true, hitting the 'tab' key will select the current select value
     * @type {Boolean}
     */
    selectOnTab: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      search: '',
      open: false,
      mutableValue: null,
      mutableOptions: [],
      innerValue: [30, 100],
      formatter: '¥{value}'
    }
  },

  computed: {
    /**
     * Classes to be output on .dropdown
     * @return {Object}
     */
    dropdownClasses() {
      return {
        open: this.dropdownOpen,
        single: !this.multiple,
        searching: this.searching,
        searchable: this.searchable,
        unsearchable: !this.searchable,
        loading: this.mutableLoading,
        rtl: this.dir === 'rtl', // This can be removed - styling is handled by `dir="rtl"` attribute
        disabled: this.disabled
      }
    },

    /**
     * If search text should clear on blur
     * @return {Boolean} True when single and clearSearchOnSelect
     */
    clearSearchOnBlur() {
      return this.clearSearchOnSelect && !this.multiple
    },

    /**
     * Return the current state of the
     * search input
     * @return {Boolean} True if non empty value
     */
    searching() {
      return !!this.search
    },

    /**
     * Return the current state of the
     * dropdown menu.
     * @return {Boolean} True if open
     */
    dropdownOpen() {
      return this.noDrop ? false : this.open && !this.mutableLoading
    },

    /**
     * Return the placeholder string if it's set
     * & there is no value selected.
     * @return {String} Placeholder text
     */
    searchPlaceholder() {
      if (this.isValueEmpty && this.placeholder) {
        return this.placeholder
      }
    },

    /**
     * The currently displayed options, filtered
     * by the search elements value. If tagging
     * true, the search text will be prepended
     * if it doesn't already exist.
     *
     * @return {array}
     */
    filteredOptions() {
      if (!this.filterable && !this.taggable) {
        return this.mutableOptions.slice()
      }
      const options = this.search.length
        ? this.filter(this.mutableOptions, this.search, this)
        : this.mutableOptions
      if (
        this.taggable &&
        this.search.length &&
        !this.optionExists(this.search)
      ) {
        options.unshift(this.search)
      }
      return options
    },

    /**
     * Check if there aren't any options selected.
     * @return {Boolean}
     */
    isValueEmpty() {
      if (this.mutableValue) {
        if (typeof this.mutableValue === 'object') {
          return !Object.keys(this.mutableValue).length
        }
        return !this.valueAsArray.length
      }

      return true
    },

    /**
     * Return the current value in array format.
     * @return {Array}
     */
    valueAsArray() {
      if (this.multiple && this.mutableValue) {
        return this.mutableValue
      } else if (this.mutableValue) {
        return [].concat(this.mutableValue)
      }

      return []
    },

    /**
     * Determines if the clear button should be displayed.
     * @return {Boolean}
     */
    showClearButton() {
      return (
        !this.multiple &&
        this.clearable &&
        !this.open &&
        this.mutableValue != null
      )
    }
  },

  watch: {
    /**
     * When the value prop changes, update
     * the internal mutableValue.
     * @param  {mixed} val
     * @return {void}
     */
    value(val) {
      this.mutableValue = val
      this.innerValue = val
    },

    /**
     * Maybe run the onChange callback.
     * @param  {string|object} val
     * @param  {string|object} old
     * @return {void}
     */
    mutableValue(val, old) {
      if (this.multiple) {
        this.onChange ? this.onChange(val) : null
      } else {
        this.onChange && val !== old ? this.onChange(val) : null
      }
    },

    /**
     * When options change, update
     * the internal mutableOptions.
     * @param  {array} val
     * @return {void}
     */
    options(val) {
      this.mutableOptions = val
    },

    /**
     * Maybe reset the mutableValue
     * when mutableOptions change.
     * @return {[type]} [description]
     */
    mutableOptions() {
      if (!this.taggable && this.resetOnOptionsChange) {
        this.mutableValue = this.multiple ? [] : null
      }
    },

    /**
     * Always reset the mutableValue when
     * the multiple prop changes.
     * @param  {Boolean} val
     * @return {void}
     */
    multiple(val) {
      this.mutableValue = val ? [] : null
    }
  },

  /**
   * Clone props into mutable values,
   * attach any event listeners.
   */
  created() {
    this.mutableValue = this.value
    this.innerValue = this.value
    this.mutableOptions = this.options.slice(0)
    this.mutableLoading = this.loading

    this.$on('option:created', this.maybePushTag)
  },

  methods: {
    /**
     * Select a given option.
     * @param  {Object|String} option
     * @return {void}
     */
    select(option) {
      if (!this.isOptionSelected(option)) {
        if (this.taggable && !this.optionExists(option)) {
          option = this.createOption(option)
        }
        if (this.index) {
          if (!option.hasOwnProperty(this.index)) {
            return console.warn(
              `[vue-select warn]: Index key "option.${this.index}" does not` +
                ` exist in options object ${JSON.stringify(option)}.`
            )
          }
          option = option[this.index]
        }
        if (this.multiple && !this.mutableValue) {
          this.mutableValue = [option]
        } else if (this.multiple) {
          this.mutableValue = [...this.mutableValue, option]
        } else {
          this.mutableValue = option
        }
        this.onInput(this.mutableValue)
      }

      this.onAfterSelect(option)
    },

    /**
     * De-select a given option.
     * @param  {Object|String} option
     * @return {void}
     */
    deselect(option) {
      if (this.multiple) {
        let ref = -1
        this.mutableValue.forEach((val) => {
          if (
            val === option ||
            (this.index && val === option[this.index]) ||
            (typeof val === 'object' && val[this.label] === option[this.label])
          ) {
            ref = val
          }
        })
        this.mutableValue = this.mutableValue.filter(entry => entry !== ref)
      } else {
        this.mutableValue = null
      }
      this.onInput(this.mutableValue)
    },

    /**
     * Clears the currently selected value(s)
     * @return {void}
     */
    clearSelection() {
      this.mutableValue = this.multiple ? [] : null
      this.onInput(this.mutableValue)
    },

    /**
     * Called from this.select after each selection.
     * @param  {Object|String} option
     * @return {void}
     */
    onAfterSelect(option) {
      if (this.closeOnSelect) {
        this.open = !this.open
        this.$refs.search.blur()
      }

      if (this.clearSearchOnSelect) {
        this.search = ''
      }
    },

    /**
     * Toggle the visibility of the dropdown menu.
     * @param  {Event} e
     * @return {void}
     */
    toggleDropdown(e) {
      if (
        e.target === this.$refs.openIndicator ||
        e.target === this.$refs.search ||
        e.target === this.$refs.toggle ||
        e.target.classList.contains('selected-tag') ||
        e.target === this.$el
      ) {
        if (this.open) {
          this.onSearchBlur()
          // this.$refs.search.blur(); // dropdown will close on blur
        } else if (!this.disabled) {
          this.open = true
          this.$refs.search.focus()
        }
      }
    },

    /**
     * Check if the given option is currently selected.
     * @param  {Object|String}  option
     * @return {Boolean}        True when selected | False otherwise
     */
    isOptionSelected(option) {
      return this.valueAsArray.some((value) => {
        if (typeof value === 'object') {
          return this.optionObjectComparator(value, option)
        }
        return value === option || value === option[this.index]
      })
    },

    /**
     * Determine if two option objects are matching.
     *
     * @param value {Object}
     * @param option {Object}
     * @returns {boolean}
     */
    optionObjectComparator(value, option) {
      if (this.index && value === option[this.index]) {
        return true
      } else if (
        value[this.label] === option[this.label] ||
        value[this.label] === option
      ) {
        return true
      } else if (this.index && value[this.index] === option[this.index]) {
        return true
      }
      return false
    },

    /**
     * Finds an option from this.options
     * where option[this.index] matches
     * the passed in value.
     *
     * @param value {Object}
     * @returns {*}
     */
    findOptionByIndexValue(value) {
      this.options.forEach((_option) => {
        if (JSON.stringify(_option[this.index]) === JSON.stringify(value)) {
          value = _option
        }
      })
      return value
    },

    /**
     * If there is any text in the search input, remove it.
     * Otherwise, blur the search input to close the dropdown.
     * @return {void}
     */
    onEscape() {
      if (!this.search.length) {
        this.$refs.search.blur()
      } else {
        this.search = ''
      }
    },

    onClose() {
      if (this.open) {
        this.onSearchBlur()
      }
    },
    onApplying() {
      this.onInput(this.innerValue)
      this.onClose()
    },
    /**
     * Close the dropdown on blur.
     * @emits  {search:blur}
     * @return {void}
     */
    onSearchBlur() {
      if (this.mousedown && !this.searching) {
        this.mousedown = false
      } else {
        if (this.clearSearchOnBlur) {
          this.search = ''
        }
        this.closeSearchOptions()
        return
      }
      // Fixed bug where no-options message could not be closed
      if (this.search.length === 0 && this.options.length === 0) {
        this.closeSearchOptions()
      }
    },

    /**
     * 'Private' function to close the search options
     * @emits  {search:blur}
     * @returns {void}
     */
    closeSearchOptions() {
      this.open = false
      this.$emit('search:blur')
    },

    /**
     * Open the dropdown on focus.
     * @emits  {search:focus}
     * @return {void}
     */
    onSearchFocus() {
      this.open = true
      this.$emit('search:focus')
    },

    /**
     * Delete the value on Delete keypress when there is no
     * text in the search input, & there's tags to delete
     * @return {this.value}
     */
    maybeDeleteValue() {
      if (
        !this.$refs.search.value.length &&
        this.mutableValue &&
        this.clearable
      ) {
        this.mutableValue = this.multiple
          ? this.mutableValue.slice(0, -1)
          : null
      }
    },

    /**
     * Determine if an option exists
     * within this.mutableOptions array.
     *
     * @param  {Object || String} option
     * @return {boolean}
     */
    optionExists(option) {
      let exists = false

      this.mutableOptions.forEach((opt) => {
        if (typeof opt === 'object' && opt[this.label] === option) {
          exists = true
        } else if (opt === option) {
          exists = true
        }
      })

      return exists
    },

    /**
     * If push-tags is true, push the
     * given option to mutableOptions.
     *
     * @param  {Object || String} option
     * @return {void}
     */
    maybePushTag(option) {
      if (this.pushTags) {
        this.mutableOptions.push(option)
      }
    },

    /**
     * Event-Handler to help workaround IE11 (probably fixes 10 as well)
     * firing a `blur` event when clicking
     * the dropdown's scrollbar, causing it
     * to collapse abruptly.
     * @return {void}
     */
    onMousedown() {
      this.mousedown = true
    },

    onMouseup() {
      this.mousedown = false
    }
  }
}
</script>

<style scoped>
.divider {
  margin-top: 30px !important;
  margin-bottom: 20px !important;
}
</style>
