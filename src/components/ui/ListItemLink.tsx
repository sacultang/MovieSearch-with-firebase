import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';
import { useMemo, forwardRef } from 'react';
import { ListItemIcon, ListItemText } from '@mui/material';
import Link from '@mui/material/Link';

interface ListItemLinkProps {
  to: string;
  icon?: React.ReactNode;
  primary?: React.ReactNode;
}

const ListItemLink = ({ to, icon, primary }: ListItemLinkProps) => {
  const CustomLink = useMemo(
    () =>
      forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'>>(function Links(
        linkProps,
        ref
      ) {
        return <RouterLink ref={ref} to={to} {...linkProps} />;
      }),
    [to]
  );
  return (
    <Link
      component={CustomLink}
      underline="none"
      // color="text.primary"
      width={'100%'}
    >
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText primary={primary} />
    </Link>
  );
};

export default ListItemLink;
