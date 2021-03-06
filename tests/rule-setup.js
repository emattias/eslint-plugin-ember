'use strict';

const { readdirSync, readFileSync } = require('fs');
const { join } = require('path');
const rules = require('../lib').rules;
const recommendedRules = require('../lib/recommended-rules.js');
const octaneRules = require('../lib/octane-rules.js');

const RULE_NAMES = Object.keys(rules);
const OCTANE_RULE_NAMES = Object.keys(octaneRules);

describe('rules setup is correct', function() {
  it('should have a list of exported rules and rules directory that match', function() {
    const path = join(__dirname, '../lib/rules');
    const files = readdirSync(path);

    // eslint-disable-next-line jest/prefer-strict-equal
    expect(RULE_NAMES).toEqual(
      files.filter(file => !file.startsWith('.')).map(file => file.replace('.js', ''))
    );
  });

  it('should list all rules in the recommended rules file', function() {
    expect(RULE_NAMES).toStrictEqual(
      Object.keys(recommendedRules).map(file => file.replace('ember/', ''))
    );
  });

  it('should list all rules in the octane rules file', function() {
    const octaneRuleNames = Object.keys(rules).filter(key => rules[key].meta.docs.octane);
    expect(OCTANE_RULE_NAMES.map(file => file.replace('ember/', ''))).toStrictEqual(
      octaneRuleNames
    );
  });

  it('should have tests for all rules', function() {
    const path = join(__dirname, '../tests/lib/rules');
    const files = readdirSync(path);

    // eslint-disable-next-line jest/prefer-strict-equal
    expect(RULE_NAMES).toEqual(
      files.filter(file => !file.startsWith('.')).map(file => file.replace('.js', ''))
    );
  });

  it('should have documentation for all rules', function() {
    const path = join(__dirname, '../docs/rules');
    const files = readdirSync(path);

    // eslint-disable-next-line jest/prefer-strict-equal
    expect(RULE_NAMES).toEqual(
      files
        .filter(file => !file.startsWith('.') && file !== '_TEMPLATE_.md')
        .map(file => file.replace('.md', ''))
    );
  });

  it('should mention all rules in the README', function() {
    const path = join(__dirname, '../README.md');
    const file = readFileSync(path, 'utf8');

    RULE_NAMES.forEach(ruleName => expect(file).toContain(ruleName));
  });
});
