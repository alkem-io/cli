/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLClient } from 'graphql-request';
import {
  Sdk,
  getSdk,
  OrganizationAuthorizationResetInput,
  SpaceAuthorizationResetInput,
  UserAuthorizationResetInput,
} from '../generated/graphql';
import { Logger } from 'winston';
import { AlkemioClient, AlkemioClientConfig } from '@alkemio/client-lib';

export class AlkemioCliClient {
  public config!: AlkemioClientConfig;
  public sdkClient!: Sdk;
  public alkemioLibClient!: AlkemioClient;
  public logger: Logger;

  constructor(config: AlkemioClientConfig, logger: Logger) {
    this.config = config;
    this.logger = logger;
    this.logger.info(`Alkemio server: ${config.apiEndpointPrivateGraphql}`);
  }

  async initialise() {
    try {
      this.alkemioLibClient = new AlkemioClient(this.config);
      await this.alkemioLibClient.enableAuthentication();
      const apiToken = this.alkemioLibClient.apiToken;

      this.logger.info(`API token: ${apiToken}`);
      const client = new GraphQLClient(this.config.apiEndpointPrivateGraphql, {
        headers: {
          authorization: `Bearer ${apiToken}`,
        },
      });
      this.sdkClient = getSdk(client);
    } catch (error) {
      throw new Error(`Unable to create client for Alkemio endpoint: ${error}`);
    }
  }

  async logUser() {
    const userResponse = await this.sdkClient.me();
    this.logger.info(
      `Authenticated user: '${userResponse.data.me.profile.displayName}'`
    );
  }

  async validateConnection() {
    return await this.alkemioLibClient.validateConnection();
  }

  public async authorizationResetUser(
    authorizationResetData: UserAuthorizationResetInput
  ) {
    const result = await this.sdkClient.authorizationPolicyResetOnUser({
      authorizationResetData: authorizationResetData,
    });

    return result.data;
  }

  public async authorizationResetSpace(
    authorizationResetData: SpaceAuthorizationResetInput
  ) {
    const result = await this.sdkClient.authorizationPolicyResetOnSpace({
      authorizationResetData: authorizationResetData,
    });

    return result.data;
  }

  public async authorizationResetOrganization(
    authorizationResetData: OrganizationAuthorizationResetInput
  ) {
    const result = await this.sdkClient.authorizationPolicyResetOnOrganization({
      authorizationResetData: authorizationResetData,
    });

    return result.data;
  }

  public async authorizationResetPlatform() {
    const result = await this.sdkClient.authorizationPolicyResetOnPlatform();

    return result.data;
  }

  public async spacesAllVisibilities() {
    const result = await this.sdkClient.spacesAllVisibilities();

    return result.data.spaces;
  }
}
