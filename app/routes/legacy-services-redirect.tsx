import { redirect } from "react-router";

export function loader() {
  return redirect("/#services");
}

export default function LegacyServicesRedirect() {
  return null;
}
