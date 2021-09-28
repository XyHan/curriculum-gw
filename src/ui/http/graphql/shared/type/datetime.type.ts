import { GraphQLScalarType } from 'graphql';
import { isISO8601 } from 'class-validator';

const parseISO8601 = value => {
  if (isISO8601(value) || value === null || value === '') {
    return value;
  }
  throw new Error('DateTime cannot represent an invalid ISO-8601 Date string');
};

const serializeISO8601 = value => {
  if (isISO8601(value) || value === null || value === '') {
    return value;
  }
  throw new Error('DateTime cannot represent an invalid ISO-8601 Date string');
};

const parseLiteralISO8601 = ast => {
  if (isISO8601(ast.value) || ast.value === null || ast.value === '') {
    return ast.value;
  }
  throw new Error('DateTime cannot represent an invalid ISO-8601 Date string');
};

export const DateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'An ISO-8601 encoded UTC date string.',
  serialize: serializeISO8601,
  parseValue: parseISO8601,
  parseLiteral: parseLiteralISO8601,
});
