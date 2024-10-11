// Types
import {
  Dictionary,
  RouterPageName,
  User,
} from '.';

/**
 * Status of retrieval.
 */
export type RetrievalStatus = 'idle'
| 'loading'
| 'success'
| 'error';

/**
 * Overall root state.
 */
export interface RootState {
  navigation: NavigationState;

  resize: ResizeState;

  user: UserState;
}

/**
 * User state interface.
 */
export interface UserState extends Record<string, any> {
  /**
   * Current logged in user.
   */
  user: User | null;

  /**
   * Status of retrieval.
   */
  status: RetrievalStatus;

  /**
   * Error if any.
   */
  error: string | undefined;

  /**
   * If the user has been checked for a session.
   */
  checked: boolean;

  /**
   * Whether the user is an admin.
   * (Doesn't verify them for any admin calls, a user changing this will do nothing).
   */
  admin: boolean;

  /**
   * Whether to show login dialog.
   */
  dialog: boolean;
}

/**
 * Navigation state interface.
 */
export interface NavigationState {
  /**
   * Name of the current page.
   */
  currentPage: RouterPageName;

  /**
   * Page parameters.
   */
  params: Dictionary<any>;
}

/**
 * Resize state interface.
 */
export interface ResizeState {
  width: number;
}
