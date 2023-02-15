import Link from 'next/link';
import { useRouter } from 'next/router';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

function NavLink({ href, children }: NavLinkProps) {
  const router = useRouter();

  const isActive = router.asPath === href;

  return (
    <Link href={href}>
      <a className={isActive ? 'active' : ''}>{children}</a>
    </Link>
  );
}