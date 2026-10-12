/** The year the site was last built. Every redeploy refreshes it. */
export function CopyrightYear() {
  return <>{process.env.BUILD_YEAR}</>;
}
