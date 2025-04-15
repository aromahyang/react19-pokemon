import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("./components/layout.tsx", [
    route("use-transition", "routes/use-transition.tsx"),
    route("use-deferred-value", "routes/use-deferred-value.tsx"),
  ]),
] satisfies RouteConfig;
