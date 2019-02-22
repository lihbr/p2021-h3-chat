export default async ({ store, params }) => {
  return store.dispatch("chat/current/getChannel", params.slug);
};
