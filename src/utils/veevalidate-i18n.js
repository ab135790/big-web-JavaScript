import { extend, configure } from 'vee-validate';
import { required, email, min, length, confirmed, max } from 'vee-validate/dist/rules';
import { i18n } from './i18n';
// 结合vuei18n的写法
configure({
  defaultMessage: (field, values) => {
    values._field_ = i18n.t(`fields.${field}`);
    return i18n.t(`validation.${values._rule_}`, values);
  }
});

extend('email', email);
extend('min', min);
extend('max', max);
extend('required', required);
extend('length', length);
// extend('confirmed', confirmed);
extend('isNumber', {
  validate (value) {
    const reg = /^[0-9]*$/;
    if (!(reg.test(value))) return true;
  }
});
extend('isPassword', {
  params: ['target'],
  validate (value, { target }) {
    if (value === target) return true;
  }
});
