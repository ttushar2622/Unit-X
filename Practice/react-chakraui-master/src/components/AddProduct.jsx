import React from "react";
import { Modal,ModalOverLay,ModalContent,ModalHeader,MoadlBody,ModalCloseButton,Button,useDisclosure,formLable,formControl
,Input,Select,RadioGroup,Radio,Stack,InputGroup,InputLeftElement,Flex
} from "@chakra-ui/react";
import { useState } from "react";

const AddProduct = ({add}) => {
  // TODO: Remove below const and instead import them from chakra
  // const Button = () => <div />;
  // const Modal = () => <div />;
  // const ModalBody = () => <div />;
  // const Input = () => <div />;
  // const Select = () => <div />;
  // const RadioGroup = () => <div />;
  // const Radio = () => <div />;
  const [from,setForm]=useState({
    title:"",
    category:"",
    gender:"",
    price:"",
  });
  const {isOpen,onOpen,onClose}=useDisclosure();
  const initialRef=React.useRef();

  const handleOnChange=(e)=>{
    let {name,value}=e.target;
    setForm({
      ...form,
      [name]:value,
    });
  };

  const handleOnSubmit=(e)=>{
    e.preventDefault();
    add({...form,imageSrc:"https://tse4.mm.bing.net/th?id=OIP.Z0PnWkn4eByb1KPMnHwl2AHaHa&pid=Api&P=0"});
    onClose();
  }

  return (
    <>
      <Button onClick={onOpen} my={4} data-cy="add-product-button">Add new</Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalBody pb={6}>
          <Input data-cy="add-product-title" />
          <Select data-cy="add-product-category">
            <option data-cy="add-product-category-shirt"></option>
            <option data-cy="add-product-category-pant"></option>
            <option data-cy="add-product-category-jeans"></option>
          </Select>
          <RadioGroup data-cy="add-product-gender">
            <Radio data-cy="add-product-gender-male"></Radio>
            <Radio data-cy="add-product-gender-female"></Radio>
            <Radio data-cy="add-product-gender-unisex"></Radio>
          </RadioGroup>
          <Input data-cy="add-product-price" />
          <Button data-cy="add-product-submit-button"></Button>
        </ModalBody>
      </Modal>
    </>
  );
};

export default AddProduct;
