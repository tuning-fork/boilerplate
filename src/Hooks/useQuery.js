import { useMemo } from "react";
import { useLocation } from "react-router-dom";

/**
 * @example
 *
 * // url = 'http://localhost:3001?token=abc&email=
 * // token = abc
 * // email = ''
 * // something = null
 * const query = useQuery()
 * const token = useMemo(() => query.get('token'), [query])
 * const email = useMemo(() => query.get('email'), [query])
 * const something = useMemo(() => query.get('something'), [query])
 */
export default function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}
