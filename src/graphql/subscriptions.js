/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAppUsers = /* GraphQL */ `
  subscription OnCreateAppUsers {
    onCreateAppUsers {
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
export const onUpdateAppUsers = /* GraphQL */ `
  subscription OnUpdateAppUsers {
    onUpdateAppUsers {
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
export const onDeleteAppUsers = /* GraphQL */ `
  subscription OnDeleteAppUsers {
    onDeleteAppUsers {
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
export const onCreateUserSettings = /* GraphQL */ `
  subscription OnCreateUserSettings {
    onCreateUserSettings {
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
export const onUpdateUserSettings = /* GraphQL */ `
  subscription OnUpdateUserSettings {
    onUpdateUserSettings {
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
export const onDeleteUserSettings = /* GraphQL */ `
  subscription OnDeleteUserSettings {
    onDeleteUserSettings {
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
