import React, {
  useContext,
  createContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import {
  login as createSession,
  authWithJwt,
} from "../services/auth/loginService";
import Spinner from "../Components/Helpers/Spinner";
import apiClient from "../config/apiClient";
import axios from "axios";

export const CurrentUserContext = createContext();

export const CurrentUserStatus = {
  PENDING: "PENDING",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
  LOGIN_REQUIRED: "LOGIN_REQUIRED",
};

const CREDENTIALS_LOCAL_STORAGE_KEY = "credentials";
const CredentialsCache = {
  save(credentials) {
    console.debug("Saving credentials to cache", credentials);
    return localStorage.setItem(
      CREDENTIALS_LOCAL_STORAGE_KEY,
      JSON.stringify(credentials)
    );
  },
  load() {
    const credentials = JSON.parse(
      localStorage.getItem(CREDENTIALS_LOCAL_STORAGE_KEY)
    );
    console.debug("Loading credentials from cache", credentials);
    return credentials;
  },
  clear() {
    console.debug("Clearing credentials from cache");
    localStorage.removeItem(CREDENTIALS_LOCAL_STORAGE_KEY);
  },
};

export const CurrentUserProvider = ({ children }) => {
  const [state, setState] = useState({
    status: CurrentUserStatus.PENDING,
    error: null,
    user: null,
    jwt: null,
  });

  const authenticatedApiClient = useMemo(
    () =>
      axios.create({
        ...apiClient.defaults,
        headers: {
          ...apiClient.headers,
          Authorization: `Bearer ${state.jwt}`,
        },
      }),
    [state.jwt]
  );

  const logout = useCallback(() => {
    CredentialsCache.clear();
    setState({
      status: CurrentUserStatus.LOGIN_REQUIRED,
      error: null,
      user: null,
      jwt: null,
    });
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const { jwt, user } = await createSession(email, password);

      CredentialsCache.save(jwt);
      setState({ status: CurrentUserStatus.SUCCESS, error: null, user, jwt });
    } catch (error) {
      setState({
        status: CurrentUserStatus.ERROR,
        error: error,
        user: null,
        jwt: null,
      });
    }
  }, []);

  const loginWithJwt = useCallback(
    async (jwt) => {
      try {
        const { user, jwt: newJwt } = await authWithJwt(jwt);
        setState({
          status: CurrentUserStatus.SUCCESS,
          error: null,
          user,
          jwt: newJwt,
        });
      } catch (error) {
        logout();
      }
    },
    [logout]
  );

  const context = { ...state, login, logout, authenticatedApiClient };

  useEffect(() => {
    const cachedJwt = CredentialsCache.load();
    loginWithJwt(cachedJwt);
  }, [loginWithJwt]);

  if (state.status === CurrentUserStatus.PENDING) {
    return <Spinner />;
  }

  return (
    <CurrentUserContext.Provider value={context}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => useContext(CurrentUserContext);
