import React, { PropsWithChildren } from 'react';
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
  let auth = true;

  if (reverse) {
    auth = !auth
  }

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (auth) {
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
