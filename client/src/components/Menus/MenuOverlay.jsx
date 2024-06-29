/* eslint-disable react/prop-types */
import TableViewDeleteContainer from "../Overlay/TableViewDeleteContainer";
import { HiEye, HiOutlineTrash } from "react-icons/hi2";
import { MdOutlineEdit } from "react-icons/md";
import Modal from "../../ui/Modal";
import InnerForm from "../../ui/InnerForm";
import Title from "../../ui/Title";
import InnerInput from "../../ui/InnerInput";
import InnerLabelInputDiv from "../../ui/InnerLabelInputDiv";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormErrorMessage from "../../ui/FormErrorMessage";
import useUpdateMenu from "./useUpdateMenu";
import useDeleteMenu from "./useDeleteMenu";
import SpinnerMiniContainer from "../../ui/SpinnerMiniContainer";
import { useNavigate } from "react-router-dom";

function MenuOverlay({ showHide, menu }) {
  // const [showOverlay, setShowOverlay] = useState(false);
  // const ref = useRef(null);

  const { is_updating_menu, update_menu_api } = useUpdateMenu();
  const { delete_menu_api, is_deleting_menu } = useDeleteMenu();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      menu_name: menu.menu_name,
      price: menu.price,
      menu_desc: menu.menu_desc,
    },
  });

  function onSubmit(data) {
    // check for image upload and extract it
    const newdata =
      data.nfsB_images.length > 0
        ? {
            ...data,
            nfsB_images: data.nfsB_images["0"],
          }
        : data;

    update_menu_api({ menu_id: menu._id, data: newdata });
  }

  // useEffect(
  //   function () {
  //     function handleOutsideClick(e) {
  //       if (ref.current && ref.current.contains(e.target)) {
  //         return;
  //       }
  //       setShowHide(false);
  //     }

  //     document.addEventListener("click", handleOutsideClick, true);

  //     return () =>
  //       document.removeEventListener("click", handleOutsideClick, true);
  //   },
  //   [setShowHide, ref]
  // );

  return (
    <>
      {is_updating_menu && <SpinnerMiniContainer />}
      {showHide ? (
        <TableViewDeleteContainer aria-disabled={true}>
          {
            <>
              <Modal>
                <Modal.Open opens="editmenu">
                  <li>
                    <button disabled={is_updating_menu || is_deleting_menu}>
                      <MdOutlineEdit fontSize="1.4rem" />
                      <span>Edit</span>
                    </button>
                  </li>
                </Modal.Open>
                <Modal.Window name="editmenu">
                  <InnerForm
                    // type="button"
                    onSubmit={handleSubmit(onSubmit)}
                    btnName="Edit"
                  >
                    <Title as="h5">Edit menu</Title>
                    <InnerLabelInputDiv nm="no">
                      <label htmlFor="menuName">Menu Name</label>
                      <InnerInput
                        type="text"
                        id="menuName"
                        {...register("menu_name", {
                          required: "This field is required",
                        })}
                      />
                      {errors?.menu_name && (
                        <FormErrorMessage>
                          {errors.menu_name.message}
                        </FormErrorMessage>
                      )}
                    </InnerLabelInputDiv>
                    <InnerLabelInputDiv nm="no">
                      <label htmlFor="menuPrice">Menu Price</label>
                      <InnerInput
                        min={0}
                        type="number"
                        id="menuPrice"
                        {...register("price", {
                          required: "This field is required",
                        })}
                      />
                      {errors?.price && (
                        <FormErrorMessage>
                          {errors.price.message}
                        </FormErrorMessage>
                      )}
                    </InnerLabelInputDiv>
                    <InnerLabelInputDiv nm="no">
                      <label htmlFor="nfsB_images">Menu image</label>
                      <FileInput
                        id="nfsB_images"
                        name="nfsB_images"
                        type="file"
                        accept="image/*"
                        {...register("nfsB_images", {
                          required: "This field is required",
                        })}
                      />
                    </InnerLabelInputDiv>
                    <InnerLabelInputDiv nm="no">
                      <label htmlFor="menuDesc">Menu desc</label>
                      <Textarea
                        type="text"
                        id="menuDesc"
                        {...register("menu_desc", {
                          required: "This field is required",
                        })}
                      />
                      {errors?.menu_desc && (
                        <FormErrorMessage>
                          {errors.menu_desc.message}
                        </FormErrorMessage>
                      )}
                    </InnerLabelInputDiv>
                  </InnerForm>
                </Modal.Window>
              </Modal>
            </>
          }
          <li>
            <button onClick={() => navigate(`/menus/${menu._id}`)}>
              <HiEye />
              <span>View</span>
            </button>
          </li>
          <li>
            <button
              disabled={is_deleting_menu || is_updating_menu}
              onClick={() => delete_menu_api({ menu_id: menu._id })}
            >
              <HiOutlineTrash stroke="var(--oc-red-8)" fontSize="1.5rem" />
              <span style={{ color: "var(--oc-red-8)" }}>Delete</span>
            </button>
          </li>
        </TableViewDeleteContainer>
      ) : (
        <></>
      )}
    </>
  );
}

export default MenuOverlay;
