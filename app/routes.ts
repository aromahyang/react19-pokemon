import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("./components/layout.tsx", [
    route("hooks/use-transition", "routes/hooks/use-transition.tsx"),
    route("hooks/use-deferred-value", "routes/hooks/use-deferred-value.tsx"),
    route("hooks/use-action-state", "routes/hooks/use-action-state.tsx"),
  ]),
] satisfies RouteConfig;
