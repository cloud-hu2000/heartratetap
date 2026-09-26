// Keep account code in the repository, but do not expose or invoke it while
// the site operates as a browser-local anonymous tool.
// Set NEXT_PUBLIC_ACCOUNTS_ENABLED=true and redeploy to restore the existing
// account flows without needing to restore deleted code.
export const ACCOUNTS_ENABLED = process.env.NEXT_PUBLIC_ACCOUNTS_ENABLED === "true";
