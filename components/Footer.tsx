type Props = {
  footer: string;
};

export default function Footer(props: Props) {
  return (
    <div className="text-center h6 my-4">
      <div>{props.footer}</div>
    </div>
  );
}
