import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from '.';

// For use throughout app instead of plain `useDispatch` and `useSelector`
// This is to avoid the need to import the `type: RootState` for `state` every time I want to use the useSelector. Also for the dispatch, to avoid the need for `AppDispatch` every time.
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector