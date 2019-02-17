import enUS from "~/assets/data/lang/en-US.json";
import frFR from "~/assets/data/lang/fr-FR.json";

const langs = {
  enUS,
  frFR
};

export const state = () => ({
  text: enUS
});

export const mutations = {
  switch(state, lang = "enUS") {
    state.text = langs[lang];
  }
};
