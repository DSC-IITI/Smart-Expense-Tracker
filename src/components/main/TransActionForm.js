import React, { useState } from "react";

import { Button } from "@chakra-ui/button";
import { Spinner } from "@chakra-ui/react";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  Radio,
  Divider,
} from "@chakra-ui/react";

const TransActionForm = ({ isOpen, onClose, addTransAction }) => {
  const [value, setValue] = useState("expense");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    type: "expense",
    desc: "",
    amount: 0,
  });

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const fetchCategory = async () => {
    setLoading(true);
    try {
      console.log("Fetching Started");
      const response = await axios.post(
        "https://expense-api-e2vl.onrender.com/api/categorize",
        {
          item: formValues.desc,
        }
      );

      if (response.status === 200) {
        console.log(response.data.category);
        setCategory(response.data.category);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.error("Error fetching category:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransAction(formValues);
    setCategory("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Smart Expense Tracker</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Enter Description</FormLabel>
              <Input
                placeholder="Description"
                name="desc"
                type="text"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt="4">
              <FormLabel>Enter Amount</FormLabel>
              <Input
                placeholder="Amount"
                type="number"
                name="amount"
                onChange={handleChange}
              />
              <Button
                bg="green.300"
                mt="4"
                color="gray.100"
                _hover={{ bg: "green.400" }}
                _focus={{}}
                _active={{ bg: "green.500" }}
                shadow="lg"
                onClick={fetchCategory}
              >
                Guess Category
              </Button>
              <div style={{ position: "relative" }}>
                <Input
                  placeholder="Category"
                  type="text"
                  name="category"
                  onChange={handleCategory}
                  value={category}
                  mt="3"
                  disabled={loading}
                />
                {loading && (
                  <Spinner
                    style={{
                      position: "absolute",
                      right: 10,
                      top: "40%",
                      transform: "translateY(-50%)",
                    }}
                  />
                )}
              </div>
            </FormControl>
            <RadioGroup mt="6" mb="2" value={value} onChange={setValue}>
              <Radio
                name="type"
                checked={formValues.type === "expense"}
                onChange={handleChange}
                _focus={{}}
                colorScheme="red"
                mr="4"
                value="expense"
              >
                Expense
              </Radio>
              <Radio
                onChange={handleChange}
                checked={formValues.type === "income"}
                name="type"
                _focus={{}}
                colorScheme="green"
                value="income"
              >
                Income
              </Radio>
            </RadioGroup>
          </ModalBody>

          <Divider />

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              bg="green.300"
              color="gray.100"
              _hover={{ bg: "green.400" }}
              _focus={{}}
              _active={{ bg: "green.500" }}
              type="submit"
              shadow="lg"
              onClick={onClose}
            >
              Add Transaction
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default TransActionForm;
