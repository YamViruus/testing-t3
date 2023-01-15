import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  Text,
} from "@chakra-ui/react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { type NextPage } from "next";
import { useState } from "react";
import { nan, number } from "zod";
import { trpc } from "../../utils/trpc";

const Home: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteUser, setDeleteUser] = useState("")
  const { isOpen: isDeleteModal, onOpen: onOpenDeleteModal, onClose: onCloseDeleteModal } = useDisclosure();
  const { data: clients, refetch } = trpc.client.getAll.useQuery();
  const addUser = trpc.client.createClient.useMutation();
  const updateUser = trpc.client.updateClient.useMutation();
  const removeUser = trpc.client.removeClient.useMutation();

  const handleDlete = async ()=>{
    try {
      await removeUser.mutateAsync({
        clientId: deleteUser
      });
      toast({
        title: "Client deleted",
        description: "Client has been successfully deleted.",
        status: "success",
        duration: 1500,
      });
      refetch();
      onCloseDeleteModal();
    } catch (error) {
      console.log(error);
    }
  }

  const updateUserForm = useFormik({
    initialValues: {
      id: "",
      nom: "",
      prenom: "",
      address: "",
      phoneNumber: "",
      credit: 0,
    },
    onSubmit: async (values) => {
      try {
        await updateUser.mutateAsync({
          ...values,
        });
        toast({
          title: "Client updated",
          description: "Client has been successfully updated.",
          status: "success",
          duration: 1500,
        });
        refetch();
        onClose();
        updateUserForm.resetForm();
      } catch (error) {
        console.log(error);
      }
    },
  });
  const formik = useFormik({
    initialValues: {
      nom: "",
      prenom: "",
      address: "",
      phoneNumber: "",
    },
    onSubmit: async (values) => {
      try {
        await addUser.mutateAsync({
          ...values
        });
        toast({
          title: "Client Added",
          description: "Client has been successfully added.",
          status: "success",
          duration: 1500,
        });
        refetch();
        formik.resetForm();
      } catch (error) {
        console.log(error);
      }
    },
  });
  const objectProto = {
    nom: true,
    prenom: true,
    address: false,
    phoneNumber : false,
    credit: false
  }
  const toast = useToast();
  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Flex mb={20} gap={10} alignItems={"center"}>
          {Object.getOwnPropertyNames(formik.initialValues).map((value:string,index:number) => {
            const key = value as keyof typeof formik.initialValues;
            if (objectProto[key]==true)
            return ( 
            <FormControl isRequired key={index}>
              <FormLabel>{value}</FormLabel>
              <Input
              onChange={(e) => {
                formik.setFieldValue(value, e.target.value);
              }}
              value={formik.values[key]}
              placeholder={value}
            />
          </FormControl>);
          return ( 
            <FormControl>
              <FormLabel>{value}</FormLabel>
              <Input
              onChange={(e) => {
                formik.setFieldValue(value, e.target.value);
              }}
              value={formik.values[key]}
              placeholder={value}
            />
          </FormControl>);

          })}
          <Button
            alignSelf={"end"}
            w="lg"
            colorScheme={"messenger"}
            type="submit"
            isLoading={addUser.isLoading}
          >
            Add Client
          </Button>
        </Flex>
      </form>

      <TableContainer>
        <Table variant="simple">
          <TableCaption>Clients Table</TableCaption>
          <Thead>
            <Tr>
              {Object.getOwnPropertyNames(objectProto).map((value :string, index:number) => {
                  return (<Th key={index}>{value.toLocaleUpperCase()}</Th>);
              })}
            </Tr>
          </Thead>
          <Tbody>
            {clients?.map((user) => {
              return (
                <Tr key={user.id}>
                  {Object.getOwnPropertyNames(user).map((value:string, index) => {
                    const key = value as keyof typeof user;
                    if (value.toString() != 'id' && value.toString() != 'code') 
                      return (<Td key={index}>{user[key]}</Td>)

                  })}
                  <Td>
                    <Menu>
                      <MenuButton>
                        <IconButton
                          aria-label="more"
                          icon={<HamburgerIcon />}
                        />
                      </MenuButton>
                      <MenuList>
                        <MenuItem
                          onClick={() => {
                            onOpen();
                            updateUserForm.setValues({
                              ...user,
                              phoneNumber: user.phoneNumber || "",
                              address: user.address || "",
                            });
                          }}
                        >
                          Edit
                        </MenuItem>
                        <MenuItem
                          onClick={()=> {
                            onOpenDeleteModal();
                            setDeleteUser(user.id)
                          }}
                        >Delete</MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              );
            })}
            {clients?.length === 0 && (
              <Tr>
                <Td>No Clients</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <Modal size={"3xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={updateUserForm.handleSubmit}>
          <ModalContent>
            <ModalHeader>Update Client</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex flexDir={"column"} gap={10} alignItems={"center"}>
                <FormControl isRequired>
                  <FormLabel>Nom</FormLabel>
                  <Input
                    onChange={(e) => {
                      updateUserForm.setFieldValue("nom", e.target.value);
                    }}
                    value={updateUserForm.values.nom}
                    placeholder="Nom"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Prenom</FormLabel>
                  <Input
                    onChange={(e) => {
                      updateUserForm.setFieldValue("prenom", e.target.value);
                    }}
                    value={updateUserForm.values.prenom}
                    placeholder="Prenom"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    onChange={(e) => {
                      updateUserForm.setFieldValue(
                        "phoneNumber",
                        e.target.value.toString()
                      );
                    }}
                    value={updateUserForm.values.phoneNumber}
                    placeholder="phoneNumber"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>address</FormLabel>
                  <Input
                    onChange={(e) => {
                      updateUserForm.setFieldValue("address", e.target.value);
                    }}
                    value={updateUserForm.values.address}
                    placeholder="address"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>credit</FormLabel>
                  <Input
                    onChange={(e) => {
                      updateUserForm.setFieldValue(
                        "credit",
                        parseInt(e.target.value)
                      );
                    }}
                    type="number"
                    value={updateUserForm.values.credit}
                    placeholder="credit"
                  />
                </FormControl>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                colorScheme={"green"}
                type="submit"
                isLoading={updateUser.isLoading}
                variant="solid"
              >
                Update
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
      <Modal isCentered isOpen={isDeleteModal} onClose={onCloseDeleteModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete client</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete the client?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleDlete} colorScheme={"red"} isLoading={removeUser.isLoading} variant='solid'>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Home;
