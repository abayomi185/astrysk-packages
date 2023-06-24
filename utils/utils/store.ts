// const getPersistKeys<T extends keyof MyType> = (obj: MyType, key: T): Omit<MyType, T> => {
//   const { [key]: _, ...rest } = obj; // use destructuring to remove the specified key
//   return rest; // return the object without the specified key
// }

// const removeKey = (obj, key): Omit<MyType, T> => {
//   const { [key]: _, ...rest } = obj; // use destructuring to remove the specified key
//   return rest; // return the object without the specified key
// };
