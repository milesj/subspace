/* eslint-disable @typescript-eslint/no-explicit-any */

export type Argv = string[];

export type ArgList = string[];

export type ListType = number[] | string[];

export type ScalarType = number | string;

export type PrimitiveType = ScalarType | boolean;

export type ValueType = ListType | PrimitiveType;

export interface OptionMap {
  [option: string]: ValueType;
}

export interface UnknownOptionMap {
  [option: string]: string;
}

export interface AliasMap {
  [name: string]: string;
}

// Determine option based on type. Only primitives are allowed.
export type InferParamConfig<T> = T extends PrimitiveType ? Param<T> : never;

// This is janky but we don't have mapped array/tuples.
// This assumes no more than 5 typed params, which is usually enough.
export type MapParamConfig<T extends PrimitiveType[]> = T extends [
  infer A,
  infer B,
  infer C,
  infer D,
  infer E,
]
  ? [
      InferParamConfig<A>,
      InferParamConfig<B>,
      InferParamConfig<C>,
      InferParamConfig<D>,
      InferParamConfig<E>,
    ]
  : T extends [infer A, infer B, infer C, infer D]
  ? [InferParamConfig<A>, InferParamConfig<B>, InferParamConfig<C>, InferParamConfig<D>]
  : T extends [infer A, infer B, infer C]
  ? [InferParamConfig<A>, InferParamConfig<B>, InferParamConfig<C>]
  : T extends [infer A, infer B]
  ? [InferParamConfig<A>, InferParamConfig<B>]
  : T extends [infer A]
  ? [InferParamConfig<A>]
  : T extends ArgList
  ? Param<string>[]
  : never;

// Like the above but for the types themselves.
// If nothing, we just fallback to an array of strings.
export type MapParamType<T extends PrimitiveType[]> = T extends [
  infer A,
  infer B,
  infer C,
  infer D,
  infer E,
]
  ? [A, B, C, D, E, ...ArgList]
  : T extends [infer A, infer B, infer C, infer D]
  ? [A, B, C, D, ...ArgList]
  : T extends [infer A, infer B, infer C]
  ? [A, B, C, ...ArgList]
  : T extends [infer A, infer B]
  ? [A, B, ...ArgList]
  : T extends [infer A]
  ? [A, ...ArgList]
  : T extends ArgList
  ? ArgList
  : never;

// Determine option based on type.
export type InferOptionConfig<T> = T extends boolean
  ? Flag
  : T extends number[] | string[]
  ? MultipleOption<T>
  : T extends number | string
  ? SingleOption<T>
  : never;

// Map over option types to infer the configs.
export type MapOptionConfig<T extends object> = { [K in keyof T]: InferOptionConfig<T[K]> };

export type CommandChecker = (arg: string) => boolean;

export type ContextFactory = (arg: string, argv: Argv) => ParserOptions<{}> | undefined;

export interface Arguments<O extends object, P extends PrimitiveType[] = ArgList> {
  command: string[];
  errors: Error[];
  options: O;
  params: MapParamType<P>;
  rest: ArgList;
  unknown: UnknownOptionMap;
}

export interface ParserSettings {
  loose?: boolean;
  unknown?: boolean;
  variadic?: boolean;
}

export interface ParserOptions<O extends object, P extends PrimitiveType[] = ArgList>
  extends ParserSettings {
  commands?: CommandChecker | string[];
  options: MapOptionConfig<O>;
  params?: MapParamConfig<P>;
}

// BASE TYPES

export interface Config {
  deprecated?: boolean;
  description: string;
  hidden?: boolean;
}

export interface Command extends Config {
  category?: string;
  usage?: string[] | string;
}

// ARGUMENT TYPES

export type InferArgType<T> = T extends boolean
  ? 'boolean'
  : T extends number[] | number
  ? 'number'
  : 'string';

export interface Arg<T> extends Config {
  default?: T;
  format?: ((value: T) => T) | null;
  type: InferArgType<T>;
  validate?: ((value: T) => void) | null;
}

export interface Option<T extends ValueType> extends Arg<T> {
  category?: string;
  short?: ShortOptionName;
}

export interface SingleOption<T extends ScalarType> extends Option<T> {
  choices?: T[];
  count?: T extends number ? true : never;
  default?: T;
}

export interface MultipleOption<T extends ListType> extends Option<T> {
  arity?: number;
  default?: T;
  multiple: true;
}

export interface Flag extends Omit<Option<boolean>, 'format' | 'validate'> {
  default?: boolean;
}

export interface Param<T extends PrimitiveType> extends Arg<T> {
  label?: string;
  required?: boolean;
}

export interface Category {
  name: string;
  weight?: number;
}

// Abstract type for easier typing
export type OptionConfig = Option<any> & {
  arity?: number;
  choices?: PrimitiveType[];
  count?: boolean;
  default?: ValueType;
  multiple?: boolean;
};

export interface OptionConfigMap {
  [name: string]: OptionConfig;
}

// Abstract type for easier typing
export type ParamConfig = Param<any>;

export type ParamConfigList = ParamConfig[];

// Without leading "--"
export type LongOptionName = string;

// Without leading "-"
export type ShortOptionName =
  | 'A'
  | 'a'
  | 'B'
  | 'b'
  | 'C'
  | 'c'
  | 'D'
  | 'd'
  | 'E'
  | 'e'
  | 'F'
  | 'f'
  | 'G'
  | 'g'
  | 'H'
  | 'h'
  | 'I'
  | 'i'
  | 'J'
  | 'j'
  | 'K'
  | 'k'
  | 'L'
  | 'l'
  | 'M'
  | 'm'
  | 'N'
  | 'n'
  | 'O'
  | 'o'
  | 'P'
  | 'p'
  | 'Q'
  | 'q'
  | 'R'
  | 'r'
  | 'S'
  | 's'
  | 'T'
  | 't'
  | 'U'
  | 'u'
  | 'V'
  | 'v'
  | 'W'
  | 'w'
  | 'X'
  | 'x'
  | 'Y'
  | 'y'
  | 'Z'
  | 'z';
