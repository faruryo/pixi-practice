import Vue from "vue";
import Router from "vue-router";

import HelloPixi from "@/components/HelloPixi";
import MoveLogo from "@/components/MoveLogo";
import CharacterAnimation from "@/components/CharacterAnimation";
import CharacterMovement from "@/components/CharacterMovement";
import CharacterMovement2 from "@/components/CharacterMovement2";
import CharacterMovement3 from "@/components/CharacterMovement3";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: HelloPixi,
      props: {
        msg: "Welcome to Your Pixi.js App"
      }
    },
    {
      path: "/HelloPixi",
      component: HelloPixi,
      props: {
        msg: "Welcome to Your Pixi.js App"
      }
    },
    {
      path: "/MoveLogo",
      component: MoveLogo
    },
    {
      path: "/CharacterAnimation",
      component: CharacterAnimation
    },
    {
      path: "/CharacterMovement",
      component: CharacterMovement
    },
    {
      path: "/CharacterMovement2",
      component: CharacterMovement2
    },
    {
      path: "/CharacterMovement3",
      component: CharacterMovement3
    }
  ]
});
