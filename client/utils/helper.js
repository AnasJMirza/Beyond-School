import { Box, Heading } from "native-base";

export const toaster = (title, status, toast) => {
  toast.show({
    render: () => {
      return (
        <Box bg={status == "success" ? "#c3a0ff" : "#f44336"} px="2" py="2" rounded="sm" mb={5}>
          <Heading color="#fff" fontSize="lg">
            {title}
          </Heading>
        </Box>
      );
    },
    placement: "top",
  });
};
