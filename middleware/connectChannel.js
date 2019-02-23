export default async ({ store, params }) => {
  await store.dispatch("chat/current/getChannel", params.slug);
};
