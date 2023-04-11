export function alreadyExist(resource: string) {
  return `this-${resource}-was-already-register-on-database`;
}

export function notFound(resource: string) {
  return `${resource}-not-found`;
}
