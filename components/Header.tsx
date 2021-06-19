type Props = {
  header: string;
};

export default function Header(props: Props) {
  return (
    <div>
      <h1 className="bg-primary px-3 text-white display-4 text-right">{props.header}</h1>
    </div>
  );
}
