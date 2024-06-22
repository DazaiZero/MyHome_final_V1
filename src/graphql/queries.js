/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAppUsers = /* GraphQL */ `
  query GetAppUsers($id: ID!) {
    getAppUsers(id: $id) {
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
export const listAppUsers = /* GraphQL */ `
  query ListAppUsers(
    $filter: ModelAppUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAppUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        username
        email
        phone_number
        userToken
        settings {
          nextToken
        }
        deviceCount
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getUserSettings = /* GraphQL */ `
  query GetUserSettings($id: ID!) {
    getUserSettings(id: $id) {
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
export const listUserSettings = /* GraphQL */ `
  query ListUserSettings(
    $filter: ModelUserSettingsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserSettings(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getUserData = /* GraphQL */ `
  query GetUserData(
    $username: String
    $userToken: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAppUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getUserData(
      username: $username
      userToken: $userToken
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          }
          nextToken
        }
        deviceCount
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const settingsByUserId = /* GraphQL */ `
  query SettingsByUserId(
    $userId: String
    $sortDirection: ModelSortDirection
    $filter: ModelUserSettingsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    SettingsByUserId(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
