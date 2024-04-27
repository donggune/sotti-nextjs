interface Props {
  text: string;
  loading: boolean;
}

export default function FormButton({ text, loading }: Props) {
  return (
    <button disabled={loading} className="primary-btn h-10 disabled:bg-neutral-400">
      {loading ? "Loading..." : text}
    </button>
  );
}
