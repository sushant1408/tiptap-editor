import React from "react";
import "./App.scss";
import TipTapEditor from "./components/TipTapEditor";
import { Box, VStack } from "@chakra-ui/react";

function App() {
  return (
    <Box>
      <VStack
        align="center"
        justify="center"
        bgColor="base_level_1"
        minH="100vh"
      >
        <TipTapEditor />
      </VStack>
    </Box>
  );
}

export default App;
