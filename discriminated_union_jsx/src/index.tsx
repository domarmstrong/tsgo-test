export type Props =
  | {
    children: (payload: { value: boolean }) => string;
    discriminator?: never;
  }
  | {
    discriminator: true;
    children: (payload: { other: number; value: boolean }) => string;
  };

export function TestUnionProp(props: Props) {
  return props.discriminator
    ? props.children({ value: false, other: 1 })
    : props.children({ value: true });
}

function TestA() {
  TestUnionProp({ children: ({ value }) => (value ? 'yes' : 'no') });

  return <TestUnionProp>{({ value }) => (value ? 'yes' : 'no')}</TestUnionProp>;
}

function TestB() {
  TestUnionProp({
    discriminator: true,
    children: ({ value, other }) => (value ? 'yes' : 'no'),
  });

  return (
    <TestUnionProp discriminator>{({ value, other }) => (value ? 'yes' : 'no')}</TestUnionProp>
  );
}
