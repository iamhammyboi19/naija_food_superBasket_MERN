import styled from "styled-components";
import DescriptionText from "../ui/DescriptionText";
import { useDispatch } from "react-redux";
import { addNote } from "../allRedux/addToCartSlice";

const TextArea = styled.textarea`
  width: 100%;
  margin-top: 1.5rem;
  padding: 1.5rem;
  border-radius: var(--border-radius-sm);
  color: var(--oc-gray-7);
  font-weight: 700;
  border: 1px solid var(--oc-gray-5);

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: var(--oc-gray-4);
    font-weight: 700;

    @media (max-width: 33.75em) {
      font-size: 1.3rem;
    }
  }
`;

function AddToCartNote() {
  const dispatch = useDispatch();
  return (
    <div
      style={{ padding: "3rem 2rem", borderTop: "1px solid var(--oc-gray-3)" }}
    >
      <DescriptionText desc="bold">Product Note</DescriptionText>
      <DescriptionText desc="tiny">
        Do you have any special references? Forward it to the seller
      </DescriptionText>
      <TextArea
        placeholder="You can write your special instructions here"
        onChange={(e) => dispatch(addNote(e.target.value))}
      ></TextArea>
    </div>
  );
}

export default AddToCartNote;
