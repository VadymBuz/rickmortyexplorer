import { NotFoundMessage } from "@/components/common/not-found-message";

export default function CharacterNotFound() {
  return (
    <NotFoundMessage
      title="No character with this ID"
      description="The link may be mistyped, or the character isn't in the Rick and Morty API."
    />
  );
}
