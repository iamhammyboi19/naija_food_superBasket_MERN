/* eslint-disable react/prop-types */
import styled from "styled-components";
import DescriptionText from "../../ui/DescriptionText";
import IconsBackgroundTaker from "../../ui/IconsBackgroundTaker";
import { HiXCircle } from "react-icons/hi2";
import { VscEdit } from "react-icons/vsc";
import ActionButton from "../../ui/ActionButton";
import Modal from "../../ui/Modal";
import ToppingsOptOverlay from "./ToppingsOptOverlay";
import ToppingsOverlay from "./ToppingsOverlay";
import useDeleteOption from "./toppings_hook/useDeleteOption";
import useDeleteToppings from "./toppings_hook/useDeleteToppings";
import { useParams } from "react-router-dom";
import SpinnerMiniContainer from "../../ui/SpinnerMiniContainer";
import ConfirmDelete from "../../ui/ConfirmDelete";

const StyledToppingsOpts = styled.div`
  width: 30rem;
  border: 1px solid var(--oc-gray-5);
  padding: 0px 0px 10px 0px;
  border-radius: var(--border-radius-sm);
  overflow: hidden;
  margin-bottom: 20px;
`;

const NewIconBackGroundTaker = styled(IconsBackgroundTaker)`
  height: 2rem;
  width: 2rem;
  background-color: var(--oc-gray-7);
`;

function ToppingsDesc({ head, price, option_name, option, topping }) {
  //
  const capitalized =
    option_name.charAt(0).toUpperCase() + option_name.slice(1);

  const { menu_id } = useParams();

  const { is_deleting_option, delete_option_api } = useDeleteOption();
  const { delete_toppings_api, is_deleting_toppings } = useDeleteToppings();
  const isLoading = is_deleting_option || is_deleting_toppings;

  return (
    <>
      {isLoading && <SpinnerMiniContainer />}
      <DescriptionText
        bg={head === "yes" ? "var(--oc-gray-2)" : "var(--oc-gray-1)"}
        bdb="yes"
        desc={head === "yes" ? "bold" : "semi-bold"}
      >
        <span>{capitalized}</span>
        <span style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {price && <span>{price.toFixed(2)}</span>}

          <Modal>
            <Modal.Open opens="confirm_delete">
              <HiXCircle fontSize={"2.5rem"} />
            </Modal.Open>
            <Modal.Window name="confirm_delete">
              <ConfirmDelete
                disabled={isLoading}
                onConfirm={() => {
                  if (head === "yes") {
                    delete_toppings_api({
                      menu_id,
                      toppings_slug: topping.slug,
                    });
                  } else {
                    delete_option_api({
                      menu_id,
                      toppings_slug: topping.slug,
                      option_slug: option.slug,
                    });
                  }
                }}
                resourceName={option_name}
              />
            </Modal.Window>
          </Modal>

          <Modal>
            <Modal.Open opens="add_or_edit_opt">
              <NewIconBackGroundTaker>
                <VscEdit color="var(--oc-white)" />
              </NewIconBackGroundTaker>
            </Modal.Open>
            <Modal.Window name="add_or_edit_opt">
              {head === "yes" ? (
                <ToppingsOverlay edit_toppings={{ ...topping }} />
              ) : (
                <ToppingsOptOverlay
                  edit_toppings_opts={{
                    ...option,
                    toppings_slug: topping.slug,
                  }}
                />
              )}
            </Modal.Window>
          </Modal>
        </span>
      </DescriptionText>
    </>
  );
}

function ToppingsOpts({ topping }) {
  return (
    <StyledToppingsOpts>
      <ToppingsDesc
        option_name={topping.toppings_name}
        head="yes"
        topping={topping}
      />

      {topping?.options?.length > 0 &&
        topping.options.map((option) => (
          <ToppingsDesc
            option_name={option.name}
            key={option._id}
            price={option.price}
            option={option}
            topping={topping}
          />
        ))}

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Modal>
          <Modal.Open opens="addoption">
            <ActionButton
              mt="10px"
              br="var(--border-radius-sm)"
              fg="var(--oc-gray-7)"
              bg="var(--oc-white)"
              bd="var(--oc-gray-5)"
              fontW={400}
              hover="yes"
              nfg="var(--oc-gray-7)"
              nbg="var(--oc-gray-1)"
            >
              Add Option
            </ActionButton>
          </Modal.Open>
          <Modal.Window name="addoption">
            <ToppingsOptOverlay
              edit_toppings_opts={{ toppings_slug: topping.slug }}
            />
          </Modal.Window>
        </Modal>
      </div>
    </StyledToppingsOpts>
  );
}

export default ToppingsOpts;
