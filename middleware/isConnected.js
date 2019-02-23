export default async ({ store, params, route }) => {
  const index = route.path.indexOf("/connect");
  if (index > 0 || index === -1) {
    await store.dispatch("chat/user/get", params.slug);
  }
};
