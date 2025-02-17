import { SbSelect } from '.'
import { SbMinibrowser } from '../Minibrowser'
import { MOCK_DATA } from '../Minibrowser/Minibrowser.stories'
import { toLowerCase } from '../../utils'

// @vue/component
const SelectTemplate = (args) => ({
  components: {
    SbSelect,
  },

  props: Object.keys(args),

  data: () => ({
    internalValue: null,
  }),

  watch: {
    value: {
      handler(newValue) {
        this.internalValue = newValue
      },
      immediate: true,
    },
    multiple: {
      handler(isMultiple) {
        this.internalValue = isMultiple ? [] : null
      },
      immediate: true,
    },
  },

  template: `
    <SbSelect
      :label="label"
      :options="options"
      :multiple="multiple"
      :left-icon="leftIcon"
      :filterable="filterable"
      :use-avatars="useAvatars"
      :inline="inline"
      :no-data-text="noDataText"
      :allow-create="allowCreate"
      :is-loading="isLoading"
      :loading-label="loadingLabel"
      :clearable="clearable"
      v-model="internalValue"
      style="max-width: 300px"
    />
  `,
})

export const defaultSelectOptionsData = [
  {
    label: 'Option 1',
    value: 1,
  },
  {
    label: 'Option 2',
    value: 2,
  },
  {
    label: 'Option 3',
    value: 3,
  },
  {
    label: 'Option 4',
    value: 4,
  },
  {
    label: 'Option 5',
    value: 5,
  },
  {
    label: 'Option 6',
    value: 6,
  },
  {
    label: 'Option 7',
    value: 7,
  },
]

export const defaultAvatarsData = [
  {
    value: '001',
    label: 'Dominik Angerer',
    src: 'https://avatars1.githubusercontent.com/u/7952803?s=400&u=0fd8a3a0721768210fdcedb7607e9ad33af9f7ad&v=4',
  },
  {
    value: '002',
    label: 'Emanuel Gonçalves',
    src: 'https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4',
  },
  {
    value: '003',
    label: 'Alexander Feiglstorfer',
    src: 'https://avatars1.githubusercontent.com/u/160495?s=460&u=b88ece40883d2e9716e833f6a3c78c56ca3eb14f&v=4',
  },
]

export default {
  title: 'Design System/Components/Form/SbSelect',
  component: SbSelect,
  excludeStories: /.*Data$/,
  args: {
    label: 'Choose an option',
    options: [...defaultSelectOptionsData],
    value: null,
    multiple: false,
    filterable: false,
    leftIcon: null,
    useAvatars: false,
    inline: false,
    noDataText: 'Sorry, no result found.',
    allowCreate: false,
    clearable: false,
    isLoading: false,
    loadingLabel: 'Loading...',
    disableInternalSearch: false,
  },
}

export const Default = SelectTemplate.bind({})

export const Multiple = SelectTemplate.bind({})

Multiple.args = {
  multiple: true,
}

export const Filterable = SelectTemplate.bind({})

Filterable.args = {
  filterable: true,
}

export const LazySearch = (args) => ({
  components: {
    SbSelect,
  },

  props: Object.keys(args),

  data: () => ({
    internalSearch: true,
    internalValue: null,
    internalOptions: args.options,
    internalLoading: args.isLoading,
  }),

  methods: {
    handleFilter(search) {
      this.internalLoading = true

      setTimeout(() => {
        if (!search) {
          this.internalOptions = this.options
          this.internalLoading = false
          return
        }

        this.internalOptions = this.options.filter((option) => {
          return toLowerCase(option.label).includes(search)
        })

        this.internalLoading = false
      }, 300)
    },
  },

  template: `
    <SbSelect
      :label="label"
      :options="internalOptions"
      :multiple="multiple"
      :left-icon="leftIcon"
      :filterable="filterable"
      :use-avatars="useAvatars"
      :inline="inline"
      :no-data-text="noDataText"
      :allow-create="allowCreate"
      :is-loading="internalLoading"
      :loading-label="loadingLabel"
      :clearable="clearable"
      :disable-internal-filter="internalSearch"
      v-model="internalValue"
      style="max-width: 300px"
      @filter="handleFilter"
    />
  `,
})

LazySearch.args = {
  filterable: true,
  disableInternalSearch: true,
}

export const MultipleAndFilterable = SelectTemplate.bind({})

MultipleAndFilterable.args = {
  multiple: true,
  filterable: true,
}

export const Loading = SelectTemplate.bind({})

Loading.args = {
  isLoading: true,
}

export const AllowCreate = SelectTemplate.bind({})

AllowCreate.args = {
  allowCreate: true,
  filterable: true,
  multiple: true,
}

export const WithIcon = SelectTemplate.bind({})

WithIcon.args = {
  leftIcon: 'calendar',
}

export const WithAvatars = SelectTemplate.bind({})

WithAvatars.args = {
  useAvatars: true,
  options: [...defaultAvatarsData],
}

export const MutipleAndAvatars = SelectTemplate.bind({})

MutipleAndAvatars.args = {
  multiple: true,
  useAvatars: true,
  options: [...defaultAvatarsData],
}

export const Inline = SelectTemplate.bind({})

Inline.args = {
  inline: true,
}

export const WithMinibrowser = (args) => ({
  components: {
    SbSelect,
    SbMinibrowser,
  },

  props: Object.keys(args),

  data: () => ({
    internalValue: null,
    minibrowserOptions: [...MOCK_DATA.FIRST_LEVEL],
  }),

  watch: {
    value: {
      handler(newValue) {
        this.internalValue = newValue
      },
      immediate: true,
    },
  },

  methods: {
    onSelectItem(item) {
      if (!item.items.length) {
        this.internalValue = item.label

        this.$refs.select.hideList()
      }
    },

    handleCloseBrowser() {
      this.$refs.select.wrapClose()
    },
  },

  template: `
    <SbSelect
      ref="select"
      :label="label"
      :left-icon="leftIcon"
      :filterable="filterable"
      :use-avatars="useAvatars"
      :inline="inline"
      v-model="internalValue"
      style="max-width: 300px"
    >
      <SbMinibrowser
        slot="minibrowser"
        :options="minibrowserOptions"
        @select-item="onSelectItem"
        @close="handleCloseBrowser"
      />
    </SbSelect>
  `,
})

export const EmitOption = (args) => ({
  components: {
    SbSelect,
    SbMinibrowser,
  },

  props: Object.keys(args),

  data: () => ({
    singleSelectValue: null,
    singleSelectOption: {},

    multipleSelectValue: [],
  }),

  watch: {
    value: {
      handler(newValue) {
        this.internalValue = newValue
      },
      immediate: true,
    },
  },

  methods: {
    handleSingleSelect(selectedValue) {
      this.singleSelectValue = selectedValue.value
      this.singleSelectOption = selectedValue
    },
  },

  template: `
    <div>
      <div style="margin-bottom: 30px">
        <h2 style="margin-bottom: 10px"> Single Select </h2>

        <SbSelect
          :label="label"
          :options="options"
          :multiple="multiple"
          :left-icon="leftIcon"
          :filterable="filterable"
          :use-avatars="useAvatars"
          :inline="inline"
          :no-data-text="noDataText"
          :allow-create="allowCreate"
          :is-loading="isLoading"
          :loading-label="loadingLabel"
          :clearable="clearable"
          emit-option
          :value="singleSelectValue"
          @input="handleSingleSelect"
          style="max-width: 300px"
        />

        <p class="font-weight-medium text-ink font-size-lg">
          Selected value {{ singleSelectValue }}
        </p>
        <p class="font-weight-medium text-ink font-size-lg">
          Selected option {{ singleSelectOption }}
        </p>
      </div>

      <h2 style="margin-bottom: 10px"> Multiple Select </h2>

      <SbSelect
        :label="label"
        :options="options"
        :multiple="multiple"
        :left-icon="leftIcon"
        :filterable="filterable"
        :use-avatars="useAvatars"
        :inline="inline"
        :no-data-text="noDataText"
        :allow-create="allowCreate"
        :is-loading="isLoading"
        :loading-label="loadingLabel"
        :clearable="clearable"
        multiple
        emit-option
        v-model="multipleSelectValue"
        style="max-width: 300px"
      />

      <p class="font-weight-medium text-ink font-size-lg">
        Selected value {{ multipleSelectValue }}
      </p>
    </div>
  `,
})

EmitOption.parameters = {
  docs: {
    description: {
      story:
        'When we set the `emitOption` property, the `input` event will send the whole option object, instead of the `value` property in options objects. It is expected different value types in **single** and **multiple** value property. In **single** selection, the `value` property can be a `Number` or a `String`. In multiple selection, the `value` **must** be an array of objects defined in options. This could be useful if you want to use the `<SbSelect>` with `v-model`',
    },
  },
}
