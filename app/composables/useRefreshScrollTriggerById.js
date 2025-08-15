import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useRefreshScrollTriggerById = (id) => {
  const trigger = ScrollTrigger.getById(id);
  if (trigger) {
    trigger.refresh();
  }
};
