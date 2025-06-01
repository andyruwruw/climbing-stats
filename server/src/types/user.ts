/**
 * User preferences.
 */
export interface UserPreferences {
  defaultClimbingType: 'boulder' | 'sport' | 'trad';
  defaultLocation: string;
  gradeSystem: {
    boulder: string;
    sport: string;
    trad: string;
  };
}

/**
 * User model.
 */
export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
  preferences: UserPreferences;
}

/**
 * User creation data.
 */
export interface CreateUserData {
  username: string;
  email: string;
  password: string;
  preferences: UserPreferences;
} 