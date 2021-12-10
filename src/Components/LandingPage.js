import React from "react";
import SplashpageLayout from "./Layouts/SplashpageLayout/SplashpageLayout";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import { useCurrentUserContext } from "../Contexts/currentUserContext";

export default function LandingPage() {
  const { currentUserStore } = useCurrentUserContext();
  const { currentOrganizationStore } = useCurrentOrganizationContext();
  const { currentOrganization } = currentOrganizationStore;
  return (
    <div>
      <SplashpageLayout />
    </div>
  );
}
