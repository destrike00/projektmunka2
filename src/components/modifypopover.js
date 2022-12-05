import PopoverWrapperWeb from "./popover-wrapper.web";
import {
  HStack,
  Stack,
  Icon,
  Text,
  IconButton,
  InputGroup,
  InputRightAddon,
  Input,
  Button,
} from "native-base";
import InputDelayed from "./input-delay.js";
import { Formik } from "formik";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { PrimaryColor } from "../style/colors";

const CustomerSchema = {
  Név: "",
  Cím: "",
  Telefonszám: "",
};
export const ModifyPopover = (props) => {
  return (
    <PopoverWrapperWeb
      header={"Adatok módosítása"}
      headername={props.headerName}
      footer={<Button color={PrimaryColor}>Módosít</Button>}
      pressableProps={{
        rounded: "md",
        _hover: { bg: "coolGray.300" },
        //width: "100%",
        alignSelf: "flex-end",
      }}
      triggerItem={
        <Icon
          name="pencil"
          as={MaterialCommunityIcons}
          size="sm"
          color="black"
        />
      }
      style={{ w: "350px", alignSelf: "center" }}
    >
      {({ popOverClose }) => {
        return (
          <Stack>
            <Formik
            //props.schema
            >
              {({
                values,
                touched,
                errors,
                handleSubmit,
                handleChange,
                setValues,
                setErrors,
              }) => (
                <Stack space={3} flex={1} px={5}>
                  {Object.keys(CustomerSchema).map((key) => {
                    return (
                      <Stack flex={1} key={key}>
                        <Text>{key}</Text>
                        <Stack>
                          <InputGroup flex={1}>
                            <Input
                              flex={"80%"}
                              size={"sm"}
                              onInputChanged={(value) => {
                                setValues({
                                  ...values,

                                  [key]: value,
                                });
                              }}
                            />
                            <InputRightAddon
                              flex={"20%"}
                              children={
                                <IconButton
                                  onPress={() => {
                                    // navigator.clipboard.writeText(values[key]);
                                  }}
                                  justifyContent={"center"}
                                  icon={
                                    <Icon as={Feather} name={"copy"} size={3} />
                                  }
                                />
                              }
                            />
                          </InputGroup>
                          {/*handleErrors(key, errors, error, touched)*/}
                        </Stack>
                      </Stack>
                    );
                  })}
                </Stack>
              )}
            </Formik>
          </Stack>
        );
      }}
    </PopoverWrapperWeb>
  );
};
