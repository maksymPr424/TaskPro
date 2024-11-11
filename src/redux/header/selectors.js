export const selectUserTheme = (state) => state.user.theme;
export const selectUserData = (state) => state.userProfile.data;
export const selectUserStatus = (state) => state.userProfile.status;
export const selectUserError = (state) => state.userProfile.error;
export const selectUserName = (state) => state.userProfile.data.name;
export const selectUserPhotoUrl = (state) => state.userProfile.data.photoUrl;
