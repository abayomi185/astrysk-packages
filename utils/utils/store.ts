// const getPersistKeys<T extends keyof MyType> = (obj: MyType, key: T): Omit<MyType, T> => {
//   const { [key]: _, ...rest } = obj; // use destructuring to remove the specified key
//   return rest; // return the object without the specified key
// }

// const removeKey = (obj, key): Omit<MyType, T> => {
//   const { [key]: _, ...rest } = obj; // use destructuring to remove the specified key
//   return rest; // return the object without the specified key
// };

export const filterPersistState = <T extends object, K>(
  state: T,
  persistStateKeys: (keyof T)[]
): K => {
  return Object.keys(state).reduce((result: any, key: string) => {
    if (persistStateKeys.includes(key as keyof T)) {
      result[key] = state[key as keyof T];
    }
    return result;
  }, {});
};
