const PROJECT_TYPE_SEPARATOR = "::";

export const makeProjectTypeValue = (programPoId: string, label: string) =>
  `${programPoId}${PROJECT_TYPE_SEPARATOR}${label}`;

export const getProjectTypeLabel = (projectType = "") =>
  projectType.includes(PROJECT_TYPE_SEPARATOR)
    ? projectType.split(PROJECT_TYPE_SEPARATOR).slice(1).join(PROJECT_TYPE_SEPARATOR)
    : projectType;
