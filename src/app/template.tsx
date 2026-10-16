/**
 * A template re-mounts on every navigation, so each page's sections
 * play their staggered entrance animation (see `.page > *` in base.css).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page">{children}</div>;
}
