export default async ({ store, params }) => {
  return store.dispatch("chat/user/get", params.slug);
};
