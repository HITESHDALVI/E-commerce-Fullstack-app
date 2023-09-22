export interface credentialType {
  email: string;
  password: string;
}

export interface regiserCredentialType extends credentialType {
  name: string;
}
export type textType = {
  key: string;
  value: string;
};
