import validator from "./validator"

export default {
  istrue: {
    bind(el, binding, vnode) {
      validator.setup(el.name, binding.expression, vnode.context)
    },
    update(el, binding, vnode) {
      const key = el.name
      const errors = validator.validate(key, el.value)
      const s = JSON.stringify

      if (s(errors) === s(vnode.context.errorBag[key])) return

      if (errors.length) {
        vnode.context.$set(vnode.context.errorBag, key, errors)
      } else {
        vnode.context.$delete(vnode.context.errorBag, key)
      }
    },
  },
}
