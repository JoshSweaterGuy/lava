function evalExclamation(expr, scope, env) {
  return !evalExpression(expr, scope, env);
}
