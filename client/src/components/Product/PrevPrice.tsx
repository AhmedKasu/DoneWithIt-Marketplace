interface Props {
  prevPrice: number | undefined;
}

export default function PrevPrice({ prevPrice }: Props) {
  return (
    <del
      style={{
        textDecoration: 'line-through',
        textDecorationThickness: '2px',
        textDecorationColor: 'gray',
      }}>
      <span style={{ color: 'gray' }}>€{prevPrice}</span>
    </del>
  );
}
