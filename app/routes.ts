import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/use-transition", "routes/use-transition.tsx"),
] satisfies RouteConfig;
