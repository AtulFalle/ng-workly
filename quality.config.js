// Quality configuration for code quality thresholds
module.exports = {
  // Code quality thresholds
  thresholds: {
    codeSmells: { max: 10 },
    securityVulnerabilities: { max: 0 },
    codeCoverage: { min: 80 },
    complexity: { max: 10 },
    duplication: { max: 3 },
    maintainability: { min: 'A' }
  },

  // ESLint configuration for quality checks
  eslint: {
    rules: {
      'complexity': ['error', 10],
      'max-lines-per-function': ['error', 50],
      'max-lines': ['error', 300],
      'max-depth': ['error', 4],
      'max-params': ['error', 4],
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-alert': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-script-url': 'error'
    }
  },

  // SonarJS rules for code smell detection
  sonarjs: {
    'sonarjs/cognitive-complexity': ['error', 15],
    'sonarjs/no-duplicate-string': ['error', { threshold: 3 }],
    'sonarjs/no-identical-functions': 'error',
    'sonarjs/no-redundant-boolean': 'error',
    'sonarjs/no-unused-collection': 'error',
    'sonarjs/prefer-immediate-return': 'error',
    'sonarjs/prefer-single-boolean-return': 'error',
    'sonarjs/no-duplicate-switch-case': 'error',
    'sonarjs/no-element-overwrite': 'error',
    'sonarjs/no-extra-arguments': 'error',
    'sonarjs/no-identical-expressions': 'error',
    'sonarjs/no-one-iteration-loop': 'error',
    'sonarjs/no-redundant-jump': 'error',
    'sonarjs/no-use-of-empty-return-value': 'error',
    'sonarjs/no-useless-catch': 'error',
    'sonarjs/prefer-object-literal': 'error',
    'sonarjs/prefer-while': 'error'
  },

  // Security rules
  security: {
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-new-func': 'error',
    'no-script-url': 'error',
    'no-alert': 'error',
    'no-console': 'warn'
  },

  // Performance rules
  performance: {
    'no-loop-func': 'error',
    'no-new-object': 'error',
    'no-new-wrappers': 'error',
    'no-array-constructor': 'error',
    'no-new-array': 'error'
  }
};
