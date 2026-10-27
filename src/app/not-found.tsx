import { NotFoundMessage } from "@/components/common/not-found-message";

export default function NotFound() {
  return (
    <NotFoundMessage
      title="Lost between dimensions"
      description="There's nothing at this address. It may have been mistyped."
    />
  );
}
