export default ({ router }) => {
  router.beforeResolve((to, _from, next) => {
    const browserWindow = typeof window !== "undefined" ? window : null;
    if (browserWindow && to.matched.length && (to.matched[0].path !== '*' && to.redirectedFrom || to.path === '/blog/')) {
      browserWindow.location.href = to.fullPath;
    } else {
      next();
    }
  });
};
