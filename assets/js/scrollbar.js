import Scrollbar from "smooth-scrollbar";

const init = $ => {
  const options = {};

  return Scrollbar.init($, options);
};

const destroy = $ => {
  return Scrollbar.destroy($);
};

export default { init, destroy };
