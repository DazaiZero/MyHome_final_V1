/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const deleteAppUsers = /* GraphQL */ `
  mutation DeleteAppUsers(
    $input: DeleteAppUsersInput!
    $condition: ModelAppUsersConditionInput
  ) {
    deleteAppUsers(input: $input, condition: $condition) {
      id
      name
      username
      email
      phone_number
      userToken
      settings {
        items {
          id
          bssid
          ssid
          deviceName
          userId
          username
          s1
          s2
          s3
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      deviceCount
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteUserSettings = /* GraphQL */ `
  mutation DeleteUserSettings(
    $input: DeleteUserSettingsInput!
    $condition: ModelUserSettingsConditionInput
  ) {
    deleteUserSettings(input: $input, condition: $condition) {
      id
      bssid
      ssid
      deviceName
      userId
      username
      s1
      s2
      s3
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createAppUsers = /* GraphQL */ `
  mutation CreateAppUsers(
    $input: CreateAppUsersInput!
    $condition: ModelAppUsersConditionInput
  ) {
    createAppUsers(input: $input, condition: $condition) {
      id
      name
      username
      email
      phone_number
      userToken
      settings {
        items {
          id
          bssid
          ssid
          deviceName
          userId
          username
          s1
          s2
          s3
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      deviceCount
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateAppUsers = /* GraphQL */ `
  mutation UpdateAppUsers(
    $input: UpdateAppUsersInput!
    $condition: ModelAppUsersConditionInput
  ) {
    updateAppUsers(input: $input, condition: $condition) {
      id
      name
      username
      email
      phone_number
      userToken
      settings {
        items {
          id
          bssid
          ssid
          deviceName
          userId
          username
          s1
          s2
          s3
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      deviceCount
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createUserSettings = /* GraphQL */ `
  mutation CreateUserSettings(
    $input: CreateUserSettingsInput!
    $condition: ModelUserSettingsConditionInput
  ) {
    createUserSettings(input: $input, condition: $condition) {
      id
      bssid
      ssid
      deviceName
      userId
      username
      s1
      s2
      s3
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateUserSettings = /* GraphQL */ `
  mutation UpdateUserSettings(
    $input: UpdateUserSettingsInput!
    $condition: ModelUserSettingsConditionInput
  ) {
    updateUserSettings(input: $input, condition: $condition) {
      id
      bssid
      ssid
      deviceName
      userId
      username
      s1
      s2
      s3
      createdAt
      updatedAt
      owner
    }
  }
`;
