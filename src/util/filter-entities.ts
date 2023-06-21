import { load } from 'node-yaml-config';

export enum EntityType {
  SPACE,
  ORGANIZATION,
  USER,
}

export function shouldProcessEntity(
  entityId: string,
  entityType: EntityType
): boolean {
  const config = load('cli.yml');
  let includeIDs: string[] = [];
  let excludeIDs: string[] = [];

  switch (entityType) {
    case EntityType.SPACE:
      excludeIDs = config.filters.spaces.exclude;
      includeIDs = config.filters.spaces.include;
      break;
    case EntityType.ORGANIZATION:
      excludeIDs = config.filters.organizations.exclude;
      includeIDs = config.filters.organizations.include;
      break;
    case EntityType.USER:
      excludeIDs = config.filters.users.exclude;
      includeIDs = config.filters.users.include;
      break;
  }

  //if we have a list of entities to be excluded it invalidates the include list
  if (excludeIDs && excludeIDs.length > 0) {
    if (excludeIDs.includes(entityId)) return false;
    else return true;
  }
  if (includeIDs && includeIDs.length > 0 && !includeIDs.includes(entityId))
    return false;

  return true;
}
