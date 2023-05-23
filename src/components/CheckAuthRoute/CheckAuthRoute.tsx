import React, { PropsWithChildren } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { selectUser } from '../../redux/slices/user';

import {
  Route,
  Redirect,
} from "react-router-dom";

type Props = {
  path: string,
  redirectPath?: string,
  reverse?: boolean,
}

export const CheckAuthRoute = ({
  children,
  redirectPath = '/login',
  reverse = false,
  ...rest
}: PropsWithChildren<Props>
) => {
  const { token } = useAppSelector(selectUser)
  let hasAuth = (!token || token === null) ? false : true;
  // in case token is present but invalid, we can invalidate it by implementting
  // handler(s) for 403 API respone and also redirect user back to login
  // But https://reqres.in/ doesn't have APIs that _require_ tokens,
  // so I can't demo that, plus I'm short on time unfortunately

  if (reverse) {
    // this is for pages we want to redirect user away from if they're logged in
    // like the login page itself
    hasAuth = !hasAuth
  }

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (hasAuth) {
          return children
        }
        return(
          <Redirect
            to={{
              pathname: redirectPath,
              state: { from: location }
            }}
          />
        )
      }
      }
    />
  );
}
