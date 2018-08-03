export default Component({
  behaviors: [],
  properties: {
    value: {
      type: String,
      value: ''
    },
    placeholder: {
      type: String,
      value: ''
    },
    placeholderStyle: {
      type: String,
      value: ''
    },
    placeholderClass: {
      type: String,
      value: ''
    },
    disabled: {
      type: Boolean,
      value: false
    },
    maxlength: {
      type: [Number, String],
      value: 140
    },
    cursorSpacing: {
      type: [Number, String],
      value: 0
    },
    focus: {
      type: Boolean,
      value: false
    },
    autoHeight: {
      type: Boolean,
      value: false
    },
    autoFocus: {
      type: Boolean,
      value: false
    },
    fixed: {
      type: Boolean,
      value: false
    },
    cursor: {
      type: [Number, String],
      value: 0
    },
    showConfirmBar: {
      type: Boolean,
      value: true
    },
    selectionStart: {
      type: [Number, String],
      value: -1
    },
    selectionEnd: {
      type: [Number, String],
      value: -1
    },
    adjust: {
      type: Boolean,
      value: false
    }
  },
  data: {},
  methods: {
    onInput (event) {
      let detail = event.detail
      let option = {}
      this.triggerEvent('input', detail, option)
    },
    onFocus (event) {
      let detail = event.detail
      let option = {}
      this.triggerEvent('focus', detail, option)
    },
    onBlur (event) {
      let detail = event.detail
      let option = {}
      this.triggerEvent('blur', detail, option)
    },
    onConfirm (event) {
      let detail = event.detail
      let option = {}
      this.triggerEvent('confirm', detail, option)
    },
    onLinechange (event) {
      let detail = event.detail
      let option = {}
      this.triggerEvent('linechange', detail, option)
    }
  }
});
