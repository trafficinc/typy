import Typy from './typy';

const t = (input, objectPath) => new Typy().t(input, objectPath);
const { Schema } = Typy;

const addCustomTypes = (validators) => {
  if (t(validators).isObject) {
    Object.keys(validators).forEach((validator) => {
      if (t(validators[validator]).isFunction) {
        Object.defineProperty(Typy.prototype, validator, {
          get() {
            return validators[validator](this.input);
          },
        });
      } else {
        throw new Error(`validator ${validator} is not a function`);
      }
    });
  } else {
    throw new Error('validators must be key value pairs');
  }
};

export default t;
export { t, Schema, addCustomTypes };
